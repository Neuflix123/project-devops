const express = require('express');
const router = express.Router();
const { createReport, getAllReports, updateReportStatus } = require('./../controllers/reportController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, createReport);
router.get('/', verifyToken, getAllReports);
router.put('/:id/status', verifyToken, isAdmin, updateReportStatus);

module.exports = router;