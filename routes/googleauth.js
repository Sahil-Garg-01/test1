const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("http://localhost:1000/shop", 
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/shop");
  }
);

module.exports = router;