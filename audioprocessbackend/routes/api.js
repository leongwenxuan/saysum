const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
const mongoURI = '';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' })); // Increase limit if needed
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const UserSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  languages: [{ language: String }],
  budget: Number,
  monthly_spending: {
    month: String,
    overall_spent: Number,
    percentage_overbudget: Number,
    weekly_spending: [
      {
        week: Number,
        spent: Number
      }
    ],
    budget_goal: Number
  },
  items: {
    Clothes: [
      { name: String, price: Number, date: Date }
    ],
    Gadgets: [
      { name: String, price: Number, date: Date }
    ],
    Food: [
      { name: String, price: Number, date: Date }
    ],
    Travel: [
      { name: String, price: Number, date: Date }
    ],
    Personal: [
      { name: String, price: Number, date: Date }
    ]
  }
});

const User = mongoose.model('User', UserSchema);

router.post('/upload', async (req, res) => {
  try {
    const { transcription, userId } = req.body; // Assuming userId is also sent in the request

    if (!transcription) {
      throw new Error('Transcription data is missing');
    }

    // Send the transcription to ChatGPT for categorization
    const chatGPTResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt: `Given the following expense: "${transcription}", provide a JSON structure to categorize this expense according to the following schema: {
          "category": "CategoryName",
          "item": {
            "name": "ItemName",
            "price": Price,
            "date": "YYYY-MM-DD"
          }
        }`,
        max_tokens: 100,
        model: 'text-davinci-003', // Use the appropriate model
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const data = chatGPTResponse.data.choices[0].text.trim();
    const categorizedExpense = JSON.parse(data);

    const { category, item } = categorizedExpense;

    // Find the user by ID and update their expenses
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.items[category]) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Add the new expense to the appropriate category
    user.items[category].push(item);

    // Save the updated user document
    await user.save();

    res.json({ message: 'Expense categorized and added successfully', category: data });
  } catch (error) {
    console.error('Error while processing transcription:', error);
    res.status(500).send('Error while processing transcription');
  }
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
