const router = require('express').Router()
const table = require('../controller/users')

router.post("/createTable", table.createTable)

router.get("/getTables", table.getAllTable)

router.get("/getATable", table.getTableFields)

module.exports = router