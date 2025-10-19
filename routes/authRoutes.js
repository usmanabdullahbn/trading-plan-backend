const express = require("express");
const { newUser, getAllUsers, getUser, deleteUser } = require("../controllers/authController");

const router = express.Router();

router.post("/new", newUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;
