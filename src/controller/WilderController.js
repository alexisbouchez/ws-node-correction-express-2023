const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

class WilderController {
  static async create(req, res) {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Created wilder");
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT") {
        // Throw conflict error if email already exists
        res.status(409).send("Email already exists");
        return;
      }

      console.log(error);
      res.status(500).send("Error while creating wilder");
    }
  }

  static async read(req, res) {
    try {
      const wilders = await dataSource.getRepository(Wilder).find();

      res.send(wilders);
    } catch (error) {
      console.log(error);
      res.status(500).send("error while querying wilders");
    }
  }

  static async update(req, res) {
    try {
      await dataSource.getRepository(Wilder).update(req.params.id, req.body);
      res.send("Updated");
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT") {
        // Throw conflict error if email already exists
        res.status(409).send("Email already exists");
        return;
      }

      console.log(error);
      res.status(500).send("error while updating wilder");
    }
  }

  static async delete(req, res) {
    try {
      await dataSource.getRepository(Wilder).delete(req.params.id);
      res.send("deleted");
    } catch (error) {
      res.status(500).send("error while deleting wilder");
    }
  }

  static async addSkill(req, res) {
    try {
      // On récupère le wilder à modifier
      const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({
        id: req.params.wilderId,
      });
      if (!wilderToUpdate) {
        return res.status(404).send("Wilder not found");
      }

      // On récupère la skill à ajouter
      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: req.params.skillId });
      if (!skillToAdd) {
        return res.status(404).send("Skill not found");
      }

      // On ajoute la skill au wilder
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

      // On sauvegarde le wilder
      await dataSource.getRepository(Wilder).save(wilderToUpdate);

      // On renvoie une réponse
      res.send("Skill added to wilder");
    } catch {
      res.status(500).send("error while adding skill to wilder");
    }
  }
}

module.exports = WilderController;
