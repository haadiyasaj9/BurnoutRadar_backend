const router = require("express").Router();
const controller = require("../controllers/dashboardController");

router.get("/", controller.getDashboard);
router.get("/latest", controller.getLatestEntry);

module.exports = router;