const express = require("express");
const router = express.Router();

// import des controllers
const { getNearbyPlaces, getCategories } = require("../controllers/placesController");

// retourne les lieux autour d’une position GPS
router.get("/nearby", getNearbyPlaces);

// retourne les catégories distinctes
router.get("/categories", getCategories);

module.exports = router;
