const { sequelize, Sequelize } = require('./db');
const { User } = require('./User');
const { Recipe } = require('./Recipe');

Recipe.belongsTo(User)
User.hasMany(Recipe)

module.exports = {
    User,
    Recipe,
    sequelize,
    Sequelize
};
