const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);


// Health check route
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
