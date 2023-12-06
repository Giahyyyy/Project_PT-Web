const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../model/UserSchema');
const Product = require('../model/ProductSchema');
const Category = require('../model/CategorySchema');
const Review = require('../model/ReviewSchema');
const db = require('../src/config');

db.on('error', (error) => {
  console.error('Lỗi kết nối MongoDB:', error);
  process.exit(1);
});

const exportData = async () => {
  try {
    const users = await User.find({});
    const categories = await Category.find({});
    const products = await Product.find({});
    const reviews = await Review.find({});

    const dataToExport = {
      users,
      categories,
      products,
      reviews,
    };

    const fileName = 'du-lieu-export.json';

    fs.writeFileSync(fileName, JSON.stringify(dataToExport), 'utf-8');

    console.log(`Dữ liệu đã được xuất thành công vào tệp: ${fileName}`);
  } catch (error) {
    console.error('Lỗi khi xuất dữ liệu:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Chờ đến khi kết nối đến cơ sở dữ liệu
db.once('open', async () => {
  console.log('Đã kết nối với cơ sở dữ liệu');
  await exportData();
  process.exit();
});
