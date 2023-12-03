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

    // Kiểm tra sự tồn tại của danh mục để tham chiếu
    let categories = await Category.find();

    // Nếu không có danh mục, tạo một danh mục mới và lưu
    if (!categories || categories.length === 0) {
      categories = [
        { category_name: 'Vegetables' },
        { category_name: 'Fruits' },
        { category_name: 'Fish' },

        // Thêm các danh mục khác nếu cần
      ];

      for (const categoryInfo of categories) {
        const newCategory = new Category(categoryInfo);
        await newCategory.save();
        console.log(`Danh mục "${categoryInfo.category_name}" đã được tạo thành công`);
      }
    }

    // Danh sách sản phẩm
    const productList = [
      {
        product_name: 'Sản phẩm 1',
        description: 'Mô tả sản phẩm 1',
        price: 50,
        discount: 5,
        img: 'url_hinh_anh_1',
        category: categories[0]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 2',
        description: 'Mô tả sản phẩm 2',
        price: 75,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: categories[0]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 3',
        description: 'Mô tả sản phẩm 2',
        price: 14,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: categories[1]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 4',
        description: 'Mô tả sản phẩm 2',
        price: 40,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: categories[1]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 5',
        description: 'Mô tả sản phẩm 2',
        price: 30,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: categories[0]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 5',
        description: 'Mô tả sản phẩm 2',
        price: 20,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: categories[2]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 6',
        description: 'Mô tả sản phẩm 2',
        price: 17,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: categories[2]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 7',
        description: 'Mô tả sản phẩm 2',
        price: 6,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: categories[2]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 8',
        description: 'Mô tả sản phẩm 2',
        price: 53,
        discount: 12,
        img: 'url_hinh_anh_2',
        category: categories[1]._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Thêm sản phẩm khác nếu cần
    ];

    for (const productInfo of productList) {
      const existingProduct = await Product.findOne({ product_name: productInfo.product_name });

      if (!existingProduct) {
        const newProduct = new Product(productInfo);
        await newProduct.save();
        console.log(`Sản phẩm "${productInfo.product_name}" đã được tạo thành công`);
      } else {
        console.log(`Sản phẩm "${productInfo.product_name}" đã tồn tại, không cần thêm mới`);
      }
    }

    console.log('Hoàn thành tạo danh sách sản phẩm');

    process.exit(); // Kết thúc quá trình Node.js sau khi seed dữ liệu
  } catch (error) {
    console.error('Lỗi khi tạo danh sách sản phẩm:', error);
    process.exit(1); // Kết thúc quá trình Node.js với mã lỗi 1
  }
};

seedDatabase();
