const { Client } = require("pg");
const { equal } = require('node:assert')
var parse = require('pg-connection-string').parse;


connectionString = "postgres://local:local@127.0.0.1:5433/hermes_local"

checkPgConnectionAlive(connectionString, 'SELECT 1').then((res) => {
  equal(res.rowCount, 1);
}).catch((err) => {
  console.log(err)})


function checkPgConnectionAlive (connectionString, query) {
  return new Promise((resolve, reject) => {
    const config = parse(connectionString);

    // Fix #3868, which true/false is not parsed to boolean
    if (typeof config.ssl === "string") {
      config.ssl = config.ssl === "true";
    }

    if (config.password === "") {
      // See https://github.com/brianc/node-postgres/issues/1927
      reject(new Error("Password is undefined."));
      return;
    }
    const client = new Client(config);

    client.on("error", (error) => {
      log.debug("postgres", "Error caught in the error event handler.");
      reject(error);
    });

    client.connect((err) => {
      if (err) {
        reject(err);
        client.end();
      } else {
        // Connected here
        try {
          // No query provided by user, use SELECT 1
          if (!query || (typeof query === "string" && query.trim() === "")) {
            query = "SELECT 1";
          }

          client.query(query, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
            client.end();
          });
        } catch (e) {
          reject(e);
          client.end();
        }
      }
    });

  });
};
