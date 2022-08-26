const express = require("express");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skill");
const gradeController = require("./controller/grade");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.read);
app.delete("/api/wilder", wilderController.delete);
app.put("/api/wilder", wilderController.update);

app.post("/api/skill", skillController.create);
app.get("/api/skill", skillController.read);
app.delete("/api/skill", skillController.delete);
app.put("/api/skill", skillController.update);

app.post("/api/grade", gradeController.create);
app.get("/api/grade", gradeController.read);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log("Server started on 3000"));
};

start();
