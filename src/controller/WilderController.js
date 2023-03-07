const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

class WilderController {
  static wilderRepository = dataSource.getRepository(Wilder);

  static async create(req, res) {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Created wilder");
    } catch (error) {
      console.log(error);
      res.send("Error while creating wilder");
    }
  }

  static async read(req, res) {
    try {
      const wilders = await dataSource.getRepository(Wilder).find();
      console.log("wilders", wilders);

      res.send(wilders);
    } catch (error) {
      console.log(error);
      res.send("error while querying wilders");
    }
  }

  static async update(req, res) {
    try {
      await this.wilderRepository.update(req.body.id, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.send("error while updating wilder");
    }
  }

  static async delete(req, res) {
    try {
      await dataSource.getRepository(Wilder).delete(req.body);
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.send("error while deleting wilder");
    }
  }

  static async addSkill(req, res) {
    try {
      const wilderToUpdate = await this.wilderRepository.findOneBy({
        name: req.body.wilderName,
      });
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
  }
}

module.exports = WilderController;
