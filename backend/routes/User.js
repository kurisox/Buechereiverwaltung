const express = require("express");
const router = express.Router();
const { USER } = require("../models");

//sends a list of all user
router.get("/getalluser", async (req, res) => {
  const allUser = await USER.findAll();
  res.json(allUser);
});

router.get("/getuserbyid/:email", async (req, res) => {
  const EMAIL_ADDRESS = req.params.email;
  console.log(EMAIL_ADDRESS);
  try {
    const user = await USER.findOne({ where: { EMAIL_ADDRESS } });
    console.log(user);
    if (user === null) {
      res.json({ exists: false });
    } else {
      res.json({ exists: true, message: "Account existiert bereits!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const EMAIL_ADDRESS = req.body.email;
  const PASSWORD = req.body.password;
  console.log(PASSWORD);

  try {
    const user = await USER.findOne({ where: { EMAIL_ADDRESS } });
    console.log(user);
    if (user != null) {
      if (PASSWORD === user.PASSWORD) {
        console.log("User konnte sich erfolgreich einloggen.");
        res.send({ loggedIn: true });
      } else {
        res.json({
          loggedIn: false,
          message: "Ungültige Kombination aus Email-Adresse und Passwort!",
        });
      }
    } else {
      res.json({ loggedIn: false, message: "Account existiert nicht!" });
    }
  } catch (err) {
    console.log(err);
  }
});

//adds a new user to the data base
router.post("/register", async (req, res) => {
  const userdata = req.body;
  console.log(userdata);
  await USER.create(userdata);
  res.json({ message: "Account wurde registriert" });
});

module.exports = router;
