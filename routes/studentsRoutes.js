const express = require('express');

const studentController = require('../controllers/studentsController')
const router = express.Router();
router.post("/",studentController.addEntries)
router.put("/:id",studentController.updateEntries)
router.delete("/:id",studentController.deleteEntries)
router.get("/" ,studentController.getStudent)
router.get("/:id",studentController.getStudentById)
router.post("/addingStudentWithCard",studentController.addValueToStudentAndIdentityCard);
router.post("/addDepartmentWithStudent",studentController.addDepartmentWithStudent);

module.exports = router;