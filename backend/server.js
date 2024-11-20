const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");
require("dotenv").config();
const { DB_URI } = process.env;

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DB_URI)
  .then((res) => {
    server.listen(port, () => {
      console.log(`Db connected...\n server is listening on ${port} `);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

server.get("/", (request, response) => {
  response.send("live");
});

server.get("/products", async (request, response) => {
  try {
    await Product.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});
