const express = require('express');
const multer = require('multer');
const path = require('path');
const UserDashboardController = require('./UserDashboardController');


const uploadDir = path.join(__dirname, '../../public/uploads/user-img');


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1];
    
    console.log('Đường dẫn tệp:', path.join(uploadDir, fileName));

    cb(null, fileName);
  },
});


const upload = multer({ storage: storage });

router.get('/info', UserDashboardController.renderUserDashboardPage);
router.get('/setting', UserDashboardController.renderUserSettingPage);


router.post('/setting',UserDashboardController.updateUserProfile)
router.post('/change-password', UserDashboardController.changePassword);
router.post('/upload-avatar', upload.single('avatar'), UserDashboardController.uploadAvatar);

module.exports = router;