const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connect/db");

const User = sequelize.define("User", {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  token : {
    type : DataTypes.STRING,
  }
});
(async () => {
  await sequelize.sync();
})();

module.exports = User;
