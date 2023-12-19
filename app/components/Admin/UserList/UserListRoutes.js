// routes/Admin.js
const express = require('express');
const router = express.Router();
const UserListController = require('./UserListController');

router.get('/', UserListController.renderUsers);
router.post('/users/:id/delete', UserListController.deleteUser)

module.exports = router;