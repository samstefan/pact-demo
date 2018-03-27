const path = require("path");
const chai = require("chai");
const { Pact } = require("@pact-foundation/pact");
const App = require("./lib/bootstrap-express");

const expect = chai.expect;

describe("Pact", () => {
  // (1) Create the Pact object to represent your provider
  const provider = new Pact({
    consumer: "ownerService",
    provider: "dogService",
    port: 8002,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "INFO",
    spec: 2
  });

  // this is the response you expect from your Provider
  const EXPECTED_BODY = {
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
  };

  context("when a valid owner exists", () => {
    describe("and they have a dog", () => {
      before(() => {
        // (2) Start the mock server
        return (
          provider
            .setup()
            // (3) add interactions to the Mock Server, as many as required
            .then(() => {
              return provider.addInteraction({
                // The 'state' field specifies a "Provider State"
                state: "i have a dog breed",
                uponReceiving: "a request for a dog breed",
                withRequest: {
                  method: "GET",
                  path: "/breeds/Labrador%20Retriever"
                },
                willRespondWith: {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                  body: EXPECTED_BODY
                }
              });
            })
        );
      });

      // (4) write your test(s)
      it("Dom should have the dog breed 'Labrador Retriever'", () => {
        const app = new App();

        return app
          .get("/owners/dom")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            expect(response.body.name).to.equal("Dom");
            expect(response.body.dogBreed.name).to.equal("Labrador Retriever");
          });
      });

      // (6) write the pact file for this consumer-provider pair,
      // and shutdown the associated mock server.
      // You should do this only _once_ per Provider you are testing.
      after(() => {
        provider.finalize();
      });
    });
  });
});
