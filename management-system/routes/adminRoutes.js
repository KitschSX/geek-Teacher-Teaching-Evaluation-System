const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, adminController.getAllAdmins);
router.post('/', authenticate, adminController.addAdmin);
router.put('/:id', authenticate, adminController.updateAdmin);
router.delete('/:id', authenticate, adminController.deleteAdmin);

module.exports = router;
