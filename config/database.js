const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDatabsae = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server!`.blue.bold);
    });
};

module.exports = connectDatabsae;
