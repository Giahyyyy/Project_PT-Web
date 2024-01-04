const express = require('express');
const UserDashboardController = require('./UserDashboardController');

const router = express.Router();

router.get('/info', UserDashboardController.renderUserDashboardPage);
router.get('/setting', UserDashboardController.renderUserSettingPage);
router.get('/order', UserDashboardController.renderUserOrderPage);


router.post('/setting',UserDashboardController.updateUserProfile)
router.post('/change-password', UserDashboardController.changePassword);

module.exports = router;