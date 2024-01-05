// routes/Admin.js
const express = require('express');
const router = express.Router();
const Controller = require('./UserAdminController');

router.get('/', Controller.render);





module.exports = router;