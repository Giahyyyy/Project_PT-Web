const express = require('express');
const UserDashboardController = require('./UserDashboardController');

const router = express.Router();

router.get('/', UserDashboardController.renderUserDashboardPage);

module.exports = router;