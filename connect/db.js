require("dotenv").config();
const { Sequelize } = require("sequelize");

// for online heroku postgress
const sequelize = new Sequelize(
  "d7arrmnr91fro8",
  "cvawvhyjljxkit",
  "952deeadbe50ce542aa661f1202ea1cfb5ea20bf935d97e20b961de218f11fd9",
  {
    host: "ec2-3-227-68-43.compute-1.amazonaws.com",
    port: 5432,
    dialect:
      "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  }
);
// const sequelize = new Sequelize(process.env.DATABASE_URL); // Example for postgres

//for local
// const sequelize = new Sequelize("test", "root", "", {
//   host: "localhost",
//   dialect:
//     "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
// });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
