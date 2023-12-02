// productSeed.js
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
    let category = await Category.findOne({});

    // Nếu không có danh mục, tạo một danh mục mới và lưu
    if (!category) {
      category = new Category({
        category_name: 'vegetable',
      });
      await category.save();
    }

    // Danh sách sản phẩm
    const productList = [
      {
        product_name: 'Sản phẩm 1',
        description: 'Mô tả sản phẩm 1',
        price: 50,
        discount: 5,
        img: 'url_hinh_anh_1',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 2',
        description: 'Mô tả sản phẩm 2',
        price: 75,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 3',
        description: 'Mô tả sản phẩm 3',
        price: 75,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 4',
        description: 'Mô tả sản phẩm 4',
        price: 75,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 5',
        description: 'Mô tả sản phẩm 5',
        price: 7,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 6',
        description: 'Mô tả sản phẩm 6',
        price: 5,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 10',
        description: 'Mô tả sản phẩm 7',
        price: 7135,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 8',
        description: 'Mô tả sản phẩm 8',
        price: 733,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_name: 'Sản phẩm 9',
        description: 'Mô tả sản phẩm 9',
        price: 54,
        discount: 8,
        img: 'url_hinh_anh_2',
        category: category._id,
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
