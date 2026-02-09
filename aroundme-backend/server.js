const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // gérer la limite de requete
const placesRoutes = require("./routes/places"); // Import des routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Autorise les requetes 
app.use(cors());

// Convertir le JSON en requete http
app.use(express.json());

// limitation de requete
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60              // 60 requetes/minute
}));

// les routes
app.use("/api/places", placesRoutes);

// lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
