const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Created wilder");
    } catch (error) {
      console.log(error);
      res.send("Error while creating wilder");
    }
  },
  read: async (req, res) => {
    try {
      const data = await dataSource.getRepository(Wilder).find();
      res.send(data);
    } catch (error) {
      res.send("error while querying wilders");
    }
  },
  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.body);
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.send("error while deleting wilder");
    }
  },
  update: async (req, res) => {
    try {
      await dataSource
        .getRepository(Wilder)
        .update(req.body.id, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.send("error while updating wilder");
    }
  },
  addSkill: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilderName });
      console.log(wilderToUpdate);
      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skillName });
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.send("Skill added to wilder");
    } catch (err) {
      console.log(err);
      res.send("error while adding skill to wilder");
    }
  },
};
