const dotenv = require('dotenv');
dotenv.config({ path: 'ini.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const  authController  = require('./controllers/authController');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);


