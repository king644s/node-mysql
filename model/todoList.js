const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connect/db");

const todoList = sequelize.define("todoList", {
  // Model attributes are defined here
  topicHeading: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  topicSummary: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
});
(async () => {
  await sequelize.sync();
})();

module.exports = todoList;
