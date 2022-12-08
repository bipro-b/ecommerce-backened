const express = require("express");
const app = express();
const cors = require("cors");

const errorMiddleware = require("./middlewire/error");
//middle wires
app.use(express.json());
app.use(cors());

//routing

const productRoute = require("./routes/product.routes");
const userRoute = require("./routes/user.routes");

app.use("/api/v1/products", productRoute);
app.use("/api/v1/user", userRoute);

// middlewire for error
app.use(errorMiddleware);

module.exports = app;
