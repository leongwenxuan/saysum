require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // To handle form submissions

// Set EJS as the template engine
app.set('view engine', 'ejs');

// MongoDB Connection
const dbURI = "mongodb+srv://leongwenxuan0:EErchKoEFkRPVK9q@saysum.6l4pd4e.mongodb.net/?retryWrites=true&w=majority&appName=saysum";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model
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

// Function to calculate monthly spending
function calculateMonthlySpending(items) {
  let overallSpent = 0;
  let weeklySpent = [0, 0, 0, 0];

  for (const category in items) {
    items[category].forEach(item => {
      overallSpent += item.price;
      const week = Math.floor((new Date(item.date).getDate() - 1) / 7);
      weeklySpent[week] += item.price;
    });
  }

  return {
    overallSpent,
    weeklySpent
  };
}

// Serve the HTML form using EJS
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// Insert test data
app.post('/addTestData', async (req, res) => {
    const items = {
      Clothes: [
        { name: "T-Shirt", price: 20.00, date: new Date('2024-04-01') },
        { name: "Jeans", price: 50.00, date: new Date('2024-04-02') },
        { name: "Underwear", price: 10.00, date: new Date('2024-04-03') },
        { name: "Sweater", price: 30.00, date: new Date('2024-04-04') },
        { name: "Jacket", price: 60.00, date: new Date('2024-04-05') },
        { name: "Suit", price: 200.00, date: new Date('2024-04-06') }
      ],
      Gadgets: [
        { name: "Smartphone", price: 700.00, date: new Date('2024-04-07') },
        { name: "Laptop", price: 1200.00, date: new Date('2024-04-08') },
        { name: "Headphones", price: 150.00, date: new Date('2024-04-09') }
      ],
      Food: [
        { name: "Pizza", price: 15.00, date: new Date('2024-04-10') },
        { name: "Burger", price: 10.00, date: new Date('2024-04-11') },
        { name: "Coffee", price: 5.00, date: new Date('2024-04-12') }
      ],
      Travel: [
        { name: "Flight Ticket", price: 500.00, date: new Date('2024-04-13') },
        { name: "Hotel Stay", price: 300.00, date: new Date('2024-04-14') }
      ],
      Personal: [
        { name: "Gym Membership", price: 50.00, date: new Date('2024-04-15') },
        { name: "Book", price: 20.00, date: new Date('2024-04-16') }
      ]
    };

    const { overallSpent, weeklySpent } = calculateMonthlySpending(items);

    const budget = 5000.00; // Monthly budget for the user

    const testData = [
      {
        user_id: "user123",
        name: "John Doe",
        languages: [
          { language: "English" }
        ],
        budget: budget,
        monthly_spending: {
          month: "April",
          overall_spent: overallSpent,
          percentage_overbudget: (overallSpent / budget - 1) * 100, // Correct reference to budget
          weekly_spending: [
            { week: 1, spent: weeklySpent[0] },
            { week: 2, spent: weeklySpent[1] },
            { week: 3, spent: weeklySpent[2] },
            { week: 4, spent: weeklySpent[3] }
          ],
          budget_goal: 4000.00
        },
        items
      }
    ];

    try {
      await User.insertMany(testData);
      res.status(201).send('Test data inserted');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Start the server
const port = process.env.PORT || 5011;
app.listen(port, () => console.log(`Server running on port ${port}`));