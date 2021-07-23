const SequelizeSlugify = require("sequelize-slugify");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    major: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Student, { source: ["name"] });
  return Student;
};
