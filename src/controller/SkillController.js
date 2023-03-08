const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

class SkillController {
  static async create(req, res) {
    try {
      await dataSource.getRepository(Skill).save(req.body);
      res.send("Created skill");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while creating skill");
    }
  }

  static async read(req, res) {
    try {
      const data = await dataSource.getRepository(Skill).find();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("error while querying skills");
    }
  }

  static async update(req, res) {
    try {
      await dataSource
        .getRepository(Skill)
        .update(req.body.id, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("error while updating skill");
    }
  }

  static async delete(req, res) {
    try {
      await dataSource.getRepository(Skill).delete(req.body);
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("error while deleting skill");
    }
  }
}

module.exports = SkillController;
