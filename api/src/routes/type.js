const { Router } = require("express");
const { getType } = require("../handlers/type")

const router = Router()

router.get("/", getType)

module.exports = router;