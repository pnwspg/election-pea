const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* http://localhost:8081/api/v1/ */
router.get("/", userController.index);

/* http://localhost:8081/api/v1/login */
router.post("/login", userController.login);

/* http://localhost:8081/api/v1/register */
router.post("/register", userController.register);

module.exports = router;
