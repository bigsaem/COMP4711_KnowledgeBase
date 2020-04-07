const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.post(
  "/signup/additional_information",
  accountController.signup_additionalInfo
);

router.post("/auth/signup", accountController.signup);

router.post("/auth/signin", accountController.signin);

router.post("/auth/logout", accountController.signout);

module.exports = router;
