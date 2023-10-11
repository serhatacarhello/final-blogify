import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/posts.js";

//create express server
const app = express();
dotenv.config(); // to use .env file
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) =>
  res.json({
    author: "Serhat",
    message: "Hello World!",
  })
);

app.use("/posts", postRoutes);

const port = process.env.PORT || 5000;
const connectionUrl = process.env.CONNECTION_URL;

// create a port
const PORT = process.env.PORT || 5000;

mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${port}`));
  })
  .catch((error) => console.log("mongodb connection error", error.message));
