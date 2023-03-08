const { dataSource } = require("../utils");
const Grade = require("../entity/Grade");
const Skill = require("../entity/Skill");
const Wilder = require("../entity/Wilder");

class GradeController {
  static async create(req, res) {
    const { grade } = req.body;
    const { wilderId, skillId } = req.params;

    const wilder = await dataSource.getRepository(Wilder).findOneBy({
      id: wilderId,
    });

    if (!wilder) {
      res.status(404).send("Wilder not found");
      return;
    }

    const skill = await dataSource.getRepository(Skill).findOneBy({
      id: skillId,
    });

    if (!skill) {
      res.status(404).send("Skill not found");
      return;
    }

    const existingGrade = await dataSource.getRepository(Grade).find({
      where: { wilder, skill },
    });
    console.log(existingGrade);
    if (existingGrade.length > 0) {
      res.status(409).send("Grade already exists");
      return;
    }

    try {
      await dataSource.getRepository(Grade).save({
        grade,
        wilder,
        skill,
      });
      res.send("Created grade");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while creating grade");
    }
  }

  static async read(req, res) {
    try {
      const wilder = await dataSource.getRepository(Wilder).findOneBy({
        id: req.params.id,
      });

      if (!wilder) {
        return res.status(404).send("Wilder not found");
      }

      const data = await dataSource.getRepository(Grade).find({
        where: {
          wilder,
        },
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("error while querying grades");
    }
  }

  static async update(req, res) {
    try {
      await dataSource
        .getRepository(Grade)
        .update(req.params.gradeId, req.body);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("error while updating grade");
    }
  }

  static async delete(req, res) {
    try {
      await dataSource.getRepository(Grade).delete({ id: req.params.gradeId });
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("error while deleting grade");
    }
  }
}

module.exports = GradeController;
