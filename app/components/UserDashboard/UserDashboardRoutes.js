const express = require('express');
const UserDashboardController = require('./UserDashboardController');

const router = express.Router();

router.get('/info', UserDashboardController.renderUserDashboardPage);
router.get('/setting', UserDashboardController.renderUserSettingPage);

module.exports = router;