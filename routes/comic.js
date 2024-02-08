require("dotenv").config();
const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.use(express.json());

// TOUS LES COMICS

router.get("/comics", async (req, res) => {
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

// TOUS LES COMICS SELON ID DU PERSONNAGE

router.get("/comics/:characterId", async (req, res) => {
  try {
    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    // console.log(response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//UN COMIC (SELON ID DU COMIC)

router.get("/comic/:comicId", async (req, res) => {
  try {
    let response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
