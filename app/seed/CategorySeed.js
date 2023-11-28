const Category = require('../model/CategorySchema');
const db = require('../src/config');

db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));
db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB cho category:'));


db.once('open', async () => {
    console.log('Đã kết nối với cơ sở dữ liệu');
  
    try {
      // Mảng chứa thông tin của các danh mục
      const categoriesData = [
        { category_name: 'vegetable' },
        { category_name: 'fish' },
        { category_name: 'meat' },
        // Thêm danh sách các danh mục khác nếu cần
      ];
  
      // Lặp qua mảng và thêm từng danh mục vào cơ sở dữ liệu
      for (const categoryInfo of categoriesData) {
        const existingCategory = await Category.findOne({ category_name: categoryInfo.category_name });
  
        if (!existingCategory) {
          const newCategory = new Category(categoryInfo);
          await newCategory.save();
          console.log(`Danh mục "${categoryInfo.category_name}" đã được tạo thành công`);
        } else {
          console.log(`Danh mục "${categoryInfo.category_name}" đã tồn tại, không cần thêm mới`);
        }
      }
  
      process.exit(); // Kết thúc quá trình Node.js sau khi seed dữ liệu
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error);
    }
  });