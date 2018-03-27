const getDogBreeds = require("../lib/get-dog-breed");

const owners = {
  dom: {
    name: "Dom",
    dogBreed: "Labrador Retriever"
  }
};

module.exports = function({ app }) {
  app.get("/owners/:owner", async (req, res, next) => {
    const { owner } = req.params;

    if (!owner) {
      res.json({ error: "Missing parameter 'owner'" });
    }

    if (owners[owner]) {
      let dogBreed;
      try {
        dogBreed = await getDogBreeds(owners[owner].dogBreed);
      } catch (e) {
        return next(e);
      }

      const response = Object.assign({}, owners[owner]);
      response.dogBreed = dogBreed;

      res.json(response);
    }
  });
};
