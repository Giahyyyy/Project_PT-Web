const User = require('../model/UserSchema');
const Product = require('../model/ProductSchema');
const Category = require('../model/CategorySchema');
const Review = require('../model/ReviewSchema');
const db = require('../src/config');

db.on('error', (error) => {
  console.error('Lỗi kết nối MongoDB:', error);
  process.exit(1); // Kết thúc quá trình Node.js với mã lỗi 1
});

const seedDatabase = async () => {
  try {
    console.log('Đã kết nối với cơ sở dữ liệu');

    // 1. Tạo danh sách người dùng
    const usersData = [];
    for (let i = 0; i < 10; i++) {
      usersData.push({
        first_name: `User${i + 1}`,
        last_name: 'Doe',
        email: `user${i + 1}@example.com`,
        password: 'mat-khau-an-toan-cua-ban',
      });
    }

    const createdUsers = await User.create(usersData);
    console.log(`Đã tạo ${createdUsers.length} người dùng thành công`);

    // 2. Tạo danh sách danh mục
    const categoriesData = [
      { category_name: 'Electronics' },
      { category_name: 'Clothing' },
      { category_name: 'Books' },
    ];

    const createdCategories = await Category.create(categoriesData);
    console.log('Danh sách danh mục đã được tạo thành công:', createdCategories);

    // Sử dụng biến cho category IDs
    const [electronicsCategoryId, clothingCategoryId, booksCategoryId] = createdCategories.map((category) => category._id);

    // 3. Tạo danh sách sản phẩm
    const productsData = [];
    for (let i = 0; i < 30; i++) {
      productsData.push({
        product_name: `Product${i + 1}`,
        description: `Description for Product${i + 1}`,
        price: Math.floor(Math.random() * 100) + 1,
        discount: Math.floor(Math.random() * 20) + 1,
        img: `url_product${i + 1}`,
        category: i % 3 === 0 ? electronicsCategoryId : i % 3 === 1 ? clothingCategoryId : booksCategoryId,
      });
    }

    const createdProducts = await Product.create(productsData);
    console.log('Danh sách sản phẩm đã được tạo thành công:', createdProducts);

    // 4. Tạo danh sách đánh giá
    const reviewsData = [];
    for (let i = 0; i < 30; i++) {
      reviewsData.push({
        user: createdUsers[i % 10]._id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `Comment for Product${i + 1}`,
        product: createdProducts[i]._id,
      });
    }

    const createdReviews = await Review.create(reviewsData);
    console.log('Danh sách đánh giá đã được tạo thành công:', createdReviews);

    console.log('Hoàn thành tạo danh sách sản phẩm và đánh giá');

    process.exit(); // Kết thúc quá trình Node.js sau khi seed dữ liệu
  } catch (error) {
    console.error('Lỗi khi tạo danh sách sản phẩm và đánh giá:', error);
    process.exit(1); // Kết thúc quá trình Node.js với mã lỗi 1
  }
};

seedDatabase();
