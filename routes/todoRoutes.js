const route = require("express").Router();

const ToDo = require("../controller/todoController");

const middleWare = require("../middleware/tokenAuthentic");

route.post("/create", middleWare.authenticateToken, ToDo.createTodo);

route.get("/get", middleWare.authenticateToken, ToDo.getTodo);

route.put("/update/:id", middleWare.authenticateToken, ToDo.updateTodo);

route.delete("/delete/:id", middleWare.authenticateToken, ToDo.deleteTodo);

module.exports = route;
