import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { auth } from "./firebase.config.js";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

dotenv.config({
  path: "config.env",
});

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT;
const APP_SECRET_KEY = process.env.APP_SECRET_KEY;
const API_ROOT = process.env.API_ROOT;
function hashPASSKey(password) {
  const SHA_KEY = process.env.SHA_KEY;

  let newPassword = password + "";
  newPassword = SHA_KEY + newPassword + SHA_KEY;
  return newPassword.split("PS")[1];
}

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

app.listen(PORT, () => {
  console.log(`listening port ${PORT}, LINK: http://localhost:${PORT}`);
});
