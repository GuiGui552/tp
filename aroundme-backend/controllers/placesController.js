// Connexion a MongoDB
const connectDB = require("../utils/db");

// Controller permettant de récupérer les lieux a proximité
async function getNearbyPlaces(req, res) {
  try {
    const db = await connectDB();
    const places = db.collection("places");

    // récupération des paramètres de la requête
    let {
      lat,
      lng,
      radius = 800,
      category,
      openNow,
      minRating,
      limit = 20,
      page = 1
    } = req.query;

    // vérification de la latitude et longiture (obligatoire)
    if (!lat || !lng) return res.status(400).json({ error: "lat/lng required" });

    // limitation des valeurs -> évite des requetes trop lourdes
    radius = Math.min(Number(radius), 5000); // max 5km
    limit = Math.min(Number(limit), 50);     // max 50 résultats
    page = Number(page);
    const skip = (page - 1) * limit;

    // Construction du filtre
    const filter = {
      geometry: {
        $near: { // permet de trouver des documents proches d’un point géographique, triés automatiquement par distance
          $geometry: { 
            type: "Point", 
            coordinates: [Number(lng), Number(lat)] 
        },
          $maxDistance: radius
        }
      }
    };

    // filtre optionnel:
    // catégorie
    if (category) filter["properties.amenity"] = category;
    // ouverture
    if (openNow !== undefined) filter["properties.opening_hours"] = openNow === "true" ? "24/7" : { $ne: "24/7" };
    // note minimal
    if (minRating) filter["properties.rating"] = { $gte: Number(minRating) };

    const results = await places
                        .find(filter)
                        .skip(skip) // ignore les documents des pages précédentes
                        .limit(limit) // limite le nb de resultat
                        .toArray(); 

    // resultat
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// récupère la liste des catégories
async function getCategories(req, res) {
  try {
    const db = await connectDB();
    const places = db.collection("places");

    // retourne les valeurs unique du champ
    const categories = await places.distinct("properties.amenity");

    // resultat
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getNearbyPlaces, getCategories };
