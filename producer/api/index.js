const getDogBreeds = require("../lib/get-dog-breeds");

const breeds = {
  "German Shepherd": {
    name: "German Shepherd",
    lifeSpan: "9 – 13 years",
    temperament: [
      "Loyal",
      "Obebdient",
      "Curious",
      "Alert",
      "Confident",
      "Intelligent",
      "Watchful",
      "Courageous"
    ],
    weight: {
      male: "30–40 kg",
      female: "22–32 kg"
    },
    colours: [
      "Black",
      "Black & Tan",
      "Red & Black",
      "Black & Silver",
      "Sable",
      "Grey"
    ]
  },
  "Labrador Retriever": {
    name: "Labrador Retriever",
    lifeSpan: "10 – 14 years",
    temperament: [
      "Kind",
      "Outgoing",
      "Agile",
      "Gentle",
      "Intelligent",
      "Even Tempered",
      "Trusting"
    ],
    weight: {
      male: "29–36 kg",
      female: " 25–32 kg"
    },
    colours: ["Black", "Chocolate", "Yellow"]
  }
};

module.exports = function({ app, logger }) {
  app.get("/breeds/:type", (req, res, next) => {
    const { type } = req.params;

    if (!type) {
      res.json({ error: "Missing parameter 'type'" });
    }

    if (breeds[type]) {
      return res.json(breeds[type]);
    }

    res.json({ error: "Could not fine breed" });
  });
};
