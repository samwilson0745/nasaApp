//import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const path=require("path");
//password-1vWvgB5qLU70PNmD

//app
const app = express();
app.disable('etag');
//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB NOT CONNECTED', err));

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname,"client","build")))
app.use(express.static('client/build'))
//routes
const testRoutes = require('./routes/moonQuake');
app.use('/', testRoutes);

//port
const port = process.env.PORT || 8000;

//listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));