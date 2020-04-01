const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get("/search/", searchController.searchKeyword);

router.get("/search/topic/", searchController.searchTopic);

module.exports = router;
