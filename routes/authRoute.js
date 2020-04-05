const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

// router.get("/login", accountController.loginPage);

// router.get("/signup", accountController.singupPage);

router.post(
  "/signup/additional_information",
  accountController.signup_additionalInfo
);

router.post("/auth/signup", accountController.signup);

router.post("/auth/signin", accountController.signin);

router.post("/auth/logout", accountController.signout);

// router.post(
//   "/auth/signup/additional_information",
//   accountController.additionalInfo
// );

module.exports = router;
