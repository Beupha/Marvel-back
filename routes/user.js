const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");

// uid2 et crypto-js sont des packages qui vont nous servir à encrypter le mot de passe
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.use(express.json());

// L'inscription

router.post("/user/signup", async (req, res) => {
  try {
    console.log(req.body);
    // Recherche dans la BDD. Est-ce qu'un utilisateur possède cet email ?
    if ((await User.findOne({ email: req.body.email })) !== null) {
      return res.status(409).json("Cet email est déjà utilisé");

      // sinon, on passe à la suite...
    } else {
      // l'utilisateur a-t-il bien envoyé les informations requises ?
      if (req.body.email && req.body.password && req.body.username) {
        // Si oui, on peut créer ce nouvel utilisateur

        // Étape 1 : encrypter le mot de passe
        // Générer le token et encrypter le mot de passe
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.body.password + salt).toString(encBase64);

        // Étape 2 : créer le nouvel utilisateur
        const newUser = new User({
          email: req.body.email,
          token: token,
          hash: hash,
          salt: salt,
          username: req.body.username,
        });

        // Étape 3 : sauvegarder ce nouvel utilisateur dans la BDD
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          username: newUser.username,
        });
      } else {
        // l'utilisateur n'a pas envoyé les informations requises ?
        res.status(400).json({ message: "Missing parameters" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// La connexion

router.post("/user/login", async (req, res) => {
  try {
    const receivedMail = req.body.email;

    const userFound = await User.findOne({ email: receivedMail });

    if (!userFound) {
      return res.status(400).json({
        message:
          "Nous n'avons pas trouvé de compte associé à cette adresse email",
      });
    }

    const receivedPassword = req.body.password;

    const saltedReceivedPassword = receivedPassword + userFound.salt;

    const newHash = SHA256(saltedReceivedPassword).toString(encBase64);

    if (newHash === userFound.hash) {
      return res
        .status(200)
        .json({ message: "Vous êtes bien connecté", token: userFound.token });
    } else {
      return res.status(401).json({ message: "Accès refusé" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
