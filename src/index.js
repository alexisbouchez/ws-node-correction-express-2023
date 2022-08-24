const express = require("express");
const dataSource = require("./utils").dataSource;
const Wilder = require("./entity/Wilder");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log("Server started on 3000"));
};

start();
