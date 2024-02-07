require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.use(express.json());

// TOUS LES PERSONNAGES

router.get("/character", async (req, res) => {
  try {
    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    // console.log(response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DETAIL SUR UN PERSONNAGE

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/:characterId?apiKey=${process.env.API_KEY}`
    );

    if (response) {
      return res.status(200).json(response.data);
    } else {
      return res
        .status(400)
        .json({ message: "Aucun personnage ne correspond à cet ID" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
