const express = require("express");
const app = express();
const cors = require("cors");

const errorMiddleware = require("./middlewire/error");
//middle wires
app.use(express.json());
app.use(cors());

//routing

const productRoute = require("./routes/product.routes");
const Product = require("./models/productModel");

app.use("/api/v1/products", productRoute);

// middlewire for error
app.use(errorMiddleware);

module.exports = app;
