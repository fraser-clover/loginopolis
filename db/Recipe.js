const { Sequelize, sequelize } = require("./db");


const Recipe = sequelize.define("recipe", {
  name: Sequelize.STRING,
  ingredients: Sequelize.STRING,
  isVegan: Sequelize.BOOLEAN,
});

module.exports = { Recipe };
