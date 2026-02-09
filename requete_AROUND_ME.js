

db.places.find({
  "geometry": {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [2.266146, 48.8346767] // [longitude, latitude]
      },
      $maxDistance: 1000
    }
  },
  // Filtre catégorie (ex: fuel, cafe, restaurant)
  "properties.amenity": "fuel",  

  // Filtre "ouvert maintenant" simplifié (pour ton dataset)
  "properties.opening_hours": "24/7", 
  
}).limit(20)
