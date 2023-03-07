const express = require("express");
const cors = require("cors");
const dataSource = require("./utils").dataSource;
const WilderController = require("./controller/WilderController");
const SkillController = require("./controller/SkillController");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use((req, res, next) => {
  if (Math.random() < 0.33) {
    res.status(418).send("I'm a teapot");
    // Log the request ip, method and url
    console.log(`${req.ip} ${req.method} ${req.url}`);
    return;
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder", WilderController.create);
app.get("/api/wilder", WilderController.read);
app.delete("/api/wilder", WilderController.delete);
app.put("/api/wilder", WilderController.update);

app.post("/api/skill", SkillController.create);
app.get("/api/skill", SkillController.read);
app.put("/api/skill", SkillController.update);
app.delete("/api/skill", SkillController.delete);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const start = async () => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("Server started on 5000"));
};

start();
