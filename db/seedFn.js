const { sequelize } = require("./db");
const { User } = require("./");
const users = require("./seedData");
const bcrypt = require("bcrypt");

const SALT_LENGTH = 10;

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  const hashedUsers = users.map(
    async (user) => {
      let hashedPassword = await bcrypt.hash(user.password, SALT_LENGTH);
      user.password = hashedPassword;
      return user;
  })

  const usersWithHashedPasswords = await Promise.all(hashedUsers);

  const hashed = await User.bulkCreate(usersWithHashedPasswords);

  return hashed;

  //await User.bulkCreate(hashUsers);
};



module.exports = seed;
