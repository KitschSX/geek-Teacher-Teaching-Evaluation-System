const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, teacherController.getAllTeachers);
router.post('/', authenticate, teacherController.addTeacher);
router.put('/:id', authenticate, teacherController.updateTeacher);
router.delete('/:id', authenticate, teacherController.deleteTeacher);

module.exports = router;
