/** @format */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "./configs/dbconfig";
/**connect to mongoose */
mongoose.set('strictQuery' , true)
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("didnt connect to db, ", err);
  });
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product", require("./routes/product").router);

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "hi 🤝",
  });
});

const port = process.env.port || 3030;
app.listen(port, () => {
  console.log(`mstack product service @ ${port}`);
});
module.exports = app;
