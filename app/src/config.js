// db.js
const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Lỗi kết nối MongoDB:', err);
});

db.on('open', () => {
  console.log('Đã kết nối thành công với cơ sở dữ liệu MongoDB');
});

mongoose.connect('mongodb+srv://hy3132002:123@data.xchby3p.mongodb.net/food-shop',{
  useNewUrlParser: true,
  useUnifiedTopology:true
});

module.exports = db;
