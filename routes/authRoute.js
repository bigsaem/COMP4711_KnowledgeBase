const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/login", accountController.loginPage);

router.get("/signup", accountController.singupPage);

router.get(
  "/signup/additional_information",
  accountController.additionalInfoPage
);

router.post("/auth/signup", accountController.signup);

router.post("/auth/login", accountController.login);

router.post("/auth/logout", accountController.logout);

router.post(
  "/auth/signup/additional_information",
  accountController.additionalInfo
);

module.exports = router;
