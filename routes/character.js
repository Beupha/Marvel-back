require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.use(express.json());

// TOUS LES PERSONNAGES

router.get("/character", async (req, res) => {
  try {
    let query = `apiKey=${process.env.API_KEY}`;
    if (req.query.name) {
      query = query + `&name=${req.query.name}`;
    }
    if (req.query.page) {
      query = query + `&skip=${(req.query.page - 1) * 100}`;
    }

    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${query}`
    );

    // console.log("response -->", response);
    // console.log("response.data -->", response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DETAIL SUR UN PERSONNAGE

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
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
