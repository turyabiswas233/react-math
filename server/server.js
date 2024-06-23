import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/questions.js";

dotenv.config({
  path: [".env"],
});

const app = express();
app.use(
  cors({
    origin: [process.env.ROOT_URL],
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;
const APP_SECRET_KEY = process.env.APP_SECRET_KEY;
const API_ROOT = process.env.API_ROOT;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// user login request
app.get(`${API_ROOT}/auth`, async (req, res) => {
  const { search } = req.query;
  if (search === APP_SECRET_KEY)
    try {
      if (search === APP_SECRET_KEY) {
        res.json({
          success: true,

          message: "Permission Granted",
        });
      } else {
        res.json({ success: false, message: "Permission Denied" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "SERVER ERROR or NOT ALLOWED" });
    }
  else res.json({ success: false, message: "SECRET KEY is INVALID" });
});

// new user create route
app.post(`${API_ROOT}/users/new`, async (req, res) => {
  const { ssKey } = req.body;

  if (ssKey === APP_SECRET_KEY)
    res.json({
      success: true,
      message: "Permission Granted",
    });
  else {
    res.json({ success: false, message: "Permission Denied" });
  }
});

app.use("/api/questions", router);
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz API!");
});

app.listen(PORT, () => {
  console.log(`listening port on http://localhost:${PORT}`);
});

function hashPASSKey(password) {
  const SHA_KEY = process.env.SHA_KEY;

  let newPassword = password + "";
  newPassword = SHA_KEY + newPassword + SHA_KEY;
  return newPassword.split("PS")[1];
}
