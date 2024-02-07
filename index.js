require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

// const userRoutes = require("./routes/user");
// app.use(userRoutes);

const characterRoutes = require("./routes/character");
app.use(characterRoutes);

// const commicRoutes = require("./routes/comic");
// app.use(paymentRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server on fire 🔥");
});
