const db = require("../connect/db");

module.exports.createTable = (req, res, next) => {
  try {
    const { tableName, tableStructure } = req.body;
    let sql = `CREATE TABLE ${tableName} (${tableStructure});`;
    db.query(sql, (err, row, fields) => {
      if (!err) {
        res
          .status(200)
          .json({ message: "table created successfully", row, fields });
      } else {
        return res.status(400).json({ message: "unsuccessful", err });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal error", err: error.message });
  }
};

module.exports.getAllTable = (req, res, next) => {
  try {
    let sql = `SHOW FULL TABLES;`;

    db.query(sql, (err, row, fields) => {
      if (err)
        return res.status(400).json({ message: "query unsuccessful", err });

      return res.status(200).json({ message: "query excuted !", sol : row[0].solution});
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal error", err: error.message });
  }
};

module.exports.getTableFields = (req, res, next) => {
  try {
    const { tableName } = req.body;
    let sql = `SELECT * FROM ${tableName};`;
    db.query(sql, (err, row, field) => {
      if (err)
        return res.status(400).json({ message: "query unsuccessful", err });
      return res.status(200).json({ message: "query excuted !", row, field });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal error", err: error.message });
  }
};
