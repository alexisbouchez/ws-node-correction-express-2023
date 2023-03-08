const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Wilder",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
    },
    email: {
      type: "text",
      unique: true,
    },
    city: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    skills: {
      type: "many-to-many",
      target: "Skill",
      joinTable: true,
      eager: true,
    },
  },
});
