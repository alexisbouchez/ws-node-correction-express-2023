const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Grade",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    grade: {
      type: "int",
    },
  },
  relations: {
    skill: {
      target: "Skill",
      type: "many-to-one",
      eager: true,
    },
    wilder: {
      target: "Wilder",
      type: "many-to-one",
      eager: true,
    },
  },
});
