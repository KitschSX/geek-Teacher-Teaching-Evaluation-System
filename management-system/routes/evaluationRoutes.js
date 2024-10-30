const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const { authenticate } = require('../middleware/auth');

router.get('/metrics', authenticate, evaluationController.getAllMetrics);
router.post('/metrics', authenticate, evaluationController.addMetric);
router.put('/metrics/:id', authenticate, evaluationController.updateMetric);
router.delete('/metrics/:id', authenticate, evaluationController.deleteMetric);

router.post('/results', authenticate, evaluationController.submitResult);
router.get('/results', authenticate, evaluationController.getAllResults);
router.put('/results/:id', authenticate, evaluationController.updateResult);

module.exports = router;
