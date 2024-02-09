require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.use(express.json());

// TOUS LES PERSONNAGES

router.get("/character", async (req, res) => {
  try {
    const limit = 100;
    let skip = 0;
    let page;

    let filters = {};

    if (Number(req.query.page) < 1) {
      // page sera par défaut à 1
      page = 1;
    } else {
      // Sinon page sera égal au query reçu
      page = Number(req.query.page);
    }

    console.log("req.query -->", req.query);
    console.log("req.body -->", req.body);
    console.log("req.params -->", req.params);

    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?skip=${
        limit * (page - 1)
      }&apiKey=${process.env.API_KEY}`
    );

    console.log(response);

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
