import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Contact from "./models/Contact.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/get-contacts", async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json(contacts);
});

app.post("/add-contact", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });
  await contact.save();
  res.json({ status: "success" });
});

app.delete("/delete-contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ status: "success" });
});

app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
