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
    const usersData = [
      { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: 'mat-khau-an-toan-cua-ban' },
      { first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com', password: 'mat-khau-an-toan-cua-ban' },
      // Thêm thông tin người dùng khác nếu cần
    ];

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
    const productsData = [
      {
        product_name: 'Smartphone',
        description: 'High-end smartphone',
        price: 1000,
        discount: 10,
        img: 'url_smartphone',
        category: electronicsCategoryId,
      },
      {
        product_name: 'Laptop',
        description: 'Powerful laptop for gaming and work',
        price: 1500,
        discount: 15,
        img: 'url_laptop',
        category: electronicsCategoryId,
      },
      {
        product_name: 'T-shirt',
        description: 'Comfortable cotton T-shirt',
        price: 20,
        discount: 5,
        img: 'url_tshirt',
        category: clothingCategoryId,
      },
      // ... (other products)
    ];

    const createdProducts = await Product.create(productsData);
    console.log('Danh sách sản phẩm đã được tạo thành công:', createdProducts);

    // 4. Tạo danh sách đánh giá
    const reviewsData = [
      {
        user: createdUsers[0]._id,
        rating: 4,
        comment: 'Good product!',
        product: createdProducts[0]._id,
      },
      {
        user: createdUsers[1]._id,
        rating: 5,
        comment: 'Excellent quality!',
        product: createdProducts[0]._id,
      },
      {
        user: createdUsers[0]._id,
        rating: 3,
        comment: 'Not bad, but could be improved.',
        product: createdProducts[1]._id,
      },
      // ... (other reviews)
    ];

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
