
const express = require('express');
const courseController = require('../controllers/courseController')
const router = express.Router();


router.post('/addCourse',courseController.addCourse);
router.get('/addStudentCourses',courseController.addStudentsToCourses)


module.exports=router;