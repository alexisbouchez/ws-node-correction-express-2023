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
    wilder: {
      target: "Wilder",
      type: "many-to-one",
      joinColumn: true,
      onDelete: "CASCADE",
    },
    skill: {
      target: "Skill",
      type: "many-to-one",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
