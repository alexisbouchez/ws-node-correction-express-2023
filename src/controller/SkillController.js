const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

class SkillController {
  static skillRepository = dataSource.getRepository(Skill);

  static async create(req, res) {
    try {
      await this.skillRepository.save(req.body);
      res.send("Created skill");
    } catch (error) {
      console.log(error);
      res.send("Error while creating skill");
    }
  }

  static async read(req, res) {
    try {
      const data = await this.skillRepository.find();
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send("error while querying skills");
    }
  }

  static async update(req, res) {
    try {
      await this.skillRepository.update(req.body.id, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.send("error while updating skill");
    }
  }

  static async delete(req, res) {
    try {
      await this.skillRepository.delete(req.body);
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.send("error while deleting skill");
    }
  }
}

module.exports = SkillController;
