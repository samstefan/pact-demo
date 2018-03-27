const fetch = require("node-fetch");

module.exports = async function() {
  const options = {
    headers: { "Content-Type": "application/json" }
  };

  const fetchResponse = await fetch(`http://localhost:8002/breeds`, options);
  const parsedJson = await fetchResponse.json();

  return parsedJson;
};
