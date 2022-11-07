const router = require("express").Router();
const table = require("../controller/users");
const middleWare = require("../middleware/tokenAuthentic");

router.post("/add", table.addUser);

router.post("/login", table.loginUser);

router.post("/update/:id", middleWare.authenticateToken, table.updateUser);

router.delete("/delete/:id", middleWare.authenticateToken, table.deleteUser);

module.exports = router;
