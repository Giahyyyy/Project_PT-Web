const Product = require('../model/ProductSchema');
const Category = require('../model/CategorySchema');
const db = require('../src/config');

db.on('error', (error) => {
  console.error('Lỗi kết nối MongoDB:', error);
  process.exit(1); // Kết thúc quá trình Node.js với mã lỗi 1
});

const seedDatabase = async () => {
  try {
    console.log('Đã kết nối với cơ sở dữ liệu');

    // Tạo danh sách danh mục
    const categories = await Category.create([
      { category_name: 'Electronics' },
      { category_name: 'Clothing' },
      { category_name: 'Books' },
    ]);

    console.log('Danh sách danh mục đã được tạo thành công:', categories);

    // Tạo danh sách sản phẩm
    const products = await Product.create([
      {
        product_name: 'Smartphone',
        description: 'High-end smartphone',
        price: 1000,
        discount: 10,
        img: 'url_smartphone',
        category: categories[0]._id,
      },
      {
        product_name: 'Laptop',
        description: 'Powerful laptop for gaming and work',
        price: 1500,
        discount: 15,
        img: 'url_laptop',
        category: categories[0]._id,
      },
      {
        product_name: 'T-shirt',
        description: 'Comfortable cotton T-shirt',
        price: 20,
        discount: 5,
        img: 'url_tshirt',
        category: categories[1]._id,
      },
      {
        product_name: 'Jeans',
        description: 'Classic blue jeans',
        price: 40,
        discount: 8,
        img: 'url_jeans',
        category: categories[1]._id,
      },
      {
        product_name: 'Novel',
        description: 'Best-selling novel',
        price: 15,
        discount: 3,
        img: 'url_novel',
        category: categories[2]._id,
      },
      {
        product_name: 'Cookbook',
        description: 'Cookbook with delicious recipes',
        price: 25,
        discount: 5,
        img: 'url_cookbook',
        category: categories[2]._id,
      },
    ]);

    console.log('Danh sách sản phẩm đã được tạo thành công:', products);

    console.log('Hoàn thành tạo danh sách sản phẩm');

    process.exit(); // Kết thúc quá trình Node.js sau khi seed dữ liệu
  } catch (error) {
    console.error('Lỗi khi tạo danh sách sản phẩm:', error);
    process.exit(1); // Kết thúc quá trình Node.js với mã lỗi 1
  }
};

seedDatabase();
