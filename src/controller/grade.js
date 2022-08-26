const dataSource = require("../utils").dataSource;
const Grade = require("../entity/Grade");
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {
  read: async (req, res) => {
    try {
      const gradesFromDB = await dataSource.getRepository(Grade).find();
      res.send(gradesFromDB);
    } catch (error) {
      console.log(error);
      res.send("Error while reading grades");
    }
  },
  create: async (req, res) => {
    try {
      const wilderFromDB = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilder });
      console.log("Wilder from DB", wilderFromDB);
      const skillFromDB = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skill });
      console.log("Skill from DB", skillFromDB);
      await dataSource.getRepository(Grade).save({
        grade: req.body.grade,
        skill: skillFromDB,
        wilder: wilderFromDB,
      });
      res.send("Created Grade");
    } catch (error) {
      console.log(error);
      res.send("Error while creating grade");
    }
  },
};
