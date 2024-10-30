const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, studentController.getAllStudents);
router.post('/', authenticate, studentController.addStudent);
router.put('/:id', authenticate, studentController.updateStudent);
router.delete('/:id', authenticate, studentController.deleteStudent);

module.exports = router;
