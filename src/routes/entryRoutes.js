const router = require("express").Router();
const controller = require("../controllers/entryController");

router.post("/", controller.createEntry);

module.exports = router;