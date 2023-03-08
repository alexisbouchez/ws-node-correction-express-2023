const { dataSource } = require("../utils");
const Grade = require("../entity/Grade");

class GradeController {
  static repository = dataSource.getRepository(Grade);

  static async create(req, res) {
    const { grade } = req.body;
    const { wilderId, skillId } = req.body;

    const existingGrade = await this.repository.findOne({
      where: { wilderId, skillId },
    });
    if (existingGrade) {
      res.status(409).send("Grade already exists");
      return;
    }

    try {
      await this.repository.save({
        grade,
        wilderId,
        skillId,
      });
      res.send("Created grade");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while creating grade");
    }
  }

  static async read(req, res) {
    try {
      const data = await this.repository.find({
        where: {
          wilderId: req.params.id,
          skillId: req.params.id,
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
      await this.repository.update(req.params.gradeId, req.body.newData);
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("error while updating grade");
    }
  }

  static async delete(req, res) {
    try {
      await this.repository.delete({ id: req.params.gradeId });
      res.send("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).send("error while deleting grade");
    }
  }
}

module.exports = GradeController;
