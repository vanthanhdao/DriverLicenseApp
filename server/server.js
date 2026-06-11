import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Question from "./routes/Question.js";
import Sign from "./routes/Sign.js";
import Video from "./routes/Video.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.error(err));

// Routes
app.use("/Question", Question);
app.use("/Sign", Sign);
app.use("/Video", Video);

app.get("/", (req, res) => {
  res.send("API Running");
});
