const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // connect to MongoDB

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.json({"message":"ok"});
})
