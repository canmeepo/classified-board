const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: './variables.env'});
const cors = require('cors')

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('db connected'))
    .catch(err => console.error(err))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server running on PORT${PORT}`)
})
