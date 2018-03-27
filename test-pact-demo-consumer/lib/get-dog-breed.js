const fetch = require("node-fetch");

module.exports = async function(type) {
  const options = {
    headers: { "Content-Type": "application/json" }
  };

  const fetchResponse = await fetch(
    `http://localhost:8002/breeds/${type}`,
    options
  );
  const parsedJson = await fetchResponse.json();

  return parsedJson;
};
