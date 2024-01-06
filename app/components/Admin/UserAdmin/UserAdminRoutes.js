// routes/Admin.js
const express = require('express');
const router = express.Router();
const Controller = require('./UserAdminController');

router.get('/', Controller.render);
router.post('/update',Controller.updateAdminProfile)
router.post('/change-password', Controller.changePassword);





module.exports = router;