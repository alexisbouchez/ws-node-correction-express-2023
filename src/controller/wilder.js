const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");

module.exports = {
  create: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .save(req.body)
      .then(() => {
        res.send("Created wilder");
      })
      .catch(() => {
        res.send("Error while creating wilder");
      });
  },
  read: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.send("error while querying wilders");
      });
  },
  delete: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .delete(req.body)
      .then(() => {
        res.send("deleted");
      });
  },
  update: (req, res) => {
    dataSource
      .getRepository(Wilder)
      .update(req.body.id, req.body.newData)
      .then(() => {
        res.send("Updated");
      });
  },
};
