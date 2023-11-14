const fs = require("fs");
const https = require("https");
const http = require("http");

function readFile(filename) {
  return new Promise((resolve) => {
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      console.log(data.toString());
      resolve();
    });
  });
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, function (response) {
        let res = "";
        response.on("data", (chunk) => {
          res += chunk;
        });
        response.on("end", () => {
          console.log(res);
          resolve();
        });
      })
      .on("error", function (err) {
        reject(err);
      });
  });
}

function downloadSave(url, filename) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
        let res = "";
        response.on("data", (chunk) => {
          res += chunk;
        });
        response.on("end", () => {
          fs.writeFile(filename, res, (err) => {
            if (err) throw err;
          });
          resolve();
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function main() {
  console.log("one");

  //   await readFile("foo.txt");
  //   await download("https://geocoding.geo.census.gov/geocoder/locations/address?street=6560+Braddock+Road&city=Alexandria&state=VA&benchmark=2020&format=json");
  await downloadSave("http://127.0.0.1/heros_json", "hero_data.json");
  console.log("two");
}

main();
