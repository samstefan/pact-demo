const request = require("supertest");
const Express = require("express");
const expressConfig = require("../../lib/express");
const api = require("../../api");

module.exports = function() {
  const app = Express();

  // Configurer Express
  expressConfig({ app });

  // Configuring API
  api({ app });

  return request(app);
};
