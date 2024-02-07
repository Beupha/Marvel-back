require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.use(express.json());

// TOUS LES COMMICS

router.get("/comic", async (req, res) => {
  try {
    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    // console.log(response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
