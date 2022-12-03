const app = require("./app");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDatabase = require("./config/database");

// Handling uncaugh Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuttting down the server due to uncaught Promise rejection`);
  ServerApiVersion.close(() => {
    process.exit(1);
  });
});

// connecting data base
connectDatabase();
// config

const port = process.env.PORT || 8080;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});

// Unhandles rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message} `);
  console.log(`Shutting down the server due to unhandled rejections`);
  ServerApiVersion.close(() => {
    process.exit(1);
  });
});
