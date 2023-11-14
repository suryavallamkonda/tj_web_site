const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("static_files"));

let data = {
  count: 110,
  next: "https://ion.tjhsst.edu/api/schedule?page=5",
  previous: "https://ion.tjhsst.edu/api/schedule?page=3",
  results: [
    {
      url: "https://ion.tjhsst.edu/api/schedule/2022-09-01",
      date: "2022-09-01",
      day_type: {
        name: "Blue Day",
        special: false,
        blocks: [
          {
            order: 1,
            name: "Period 1",
            start: "8:40",
            end: "10:15",
          },
          {
            order: 2,
            name: "Period 2",
            start: "10:25",
            end: "12:00",
          },
          {
            order: 3,
            name: "Lunch",
            start: "12:00",
            end: "12:40",
          },
          {
            order: 4,
            name: "Period 3",
            start: "12:40",
            end: "14:15",
          },
          {
            order: 5,
            name: "Period 4",
            start: "14:25",
            end: "16:00",
          },
        ],
      },
    },
  ],
};

let obj = {};
obj["date"] = data["results"][0]["date"];
obj["day"] = data["results"][0]["day_type"]["name"];

obj["sched"] = [];

data["results"][0]["day_type"]["blocks"].forEach((element) => {
  let name = element["name"];
  obj["sched"].push(name);
  //   obj["sched"].push("\n");
});

app.get("/", (req, res) => {
  res.render("schedule", obj);
});

var listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function () {
    console.log("server started");
  }
);
