import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import db from "./database.js";
import { Login, Register } from "./user.js";

const app = express();
const port = 8080;

db().then(() => {
  console.log("Database initialization started");
}).catch((err) => {
  console.error("Failed to initialize database:", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("everything is fine");
});


app.post("/api/register", Register);
app.post("/api/login", Login);

app.listen(port, () => {
  console.log(`Server is running on port no. ${port}`);
});
