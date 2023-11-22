-- Tạo cơ sở dữ liệu "Shop"
CREATE DATABASE Shop;
USE Shop;

CREATE TABLE Categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255)
);

-- Tạo bảng "Products" (Sản phẩm) với trường "img" cho hình ảnh
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    img VARCHAR(255), -- Đường dẫn đến hình ảnh sản phẩm
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Tạo bảng "Users" (Người dùng)
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address TEXT,
    phone VARCHAR(15)
);

-- Tạo bảng "Orders" (Đơn đặt hàng)
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tạo bảng "OrderDetails" (Chi tiết đơn đặt hàng)
CREATE TABLE OrderDetails (
    order_detail_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Tạo bảng "UserRoles" (Vai trò người dùng)
CREATE TABLE UserRoles (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(50)
);

-- Tạo bảng liên kết người dùng với vai trò
CREATE TABLE UserRoleMapping (
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (role_id) REFERENCES UserRoles(role_id)
);

-- Tạo bảng "Checkout" (Thanh toán)
CREATE TABLE Checkout (
    checkout_id INT PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(50), -- Phương thức thanh toán (ví dụ: "Thẻ tín dụng", "Chuyển khoản")
    total_amount DECIMAL(10, 2), -- Tổng số tiền thanh toán
    payment_status VARCHAR(50), -- Trạng thái thanh toán (ví dụ: "Chưa thanh toán", "Đã thanh toán")
    transaction_id VARCHAR(100), -- Mã giao dịch thanh toán (nếu có)
    payment_date TIMESTAMP, -- Ngày thanh toán
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Insert sample data into Categories table
INSERT INTO Categories (category_id, category_name) VALUES
(1, 'Burgers'),
(2, 'Pizzas'),
(3, 'Pasta'),
(4, 'Salads'),
(5, 'Desserts');

-- Insert sample data into Products table
INSERT INTO Products (product_id, product_name, description, price, discount, img, category_id) VALUES
(1, 'Classic Burger', 'A classic beef burger with lettuce, tomato, and cheese.', 8.99, 0, 'burger1.jpg', 1),
(2, 'Vegetarian Burger', 'A delicious vegetarian burger with grilled veggies and cheese.', 7.99, 0, 'burger2.jpg', 1),
(3, 'Pepperoni Pizza', 'Classic pizza with tomato sauce, mozzarella, and pepperoni.', 11.99, 0, 'pizza1.jpg', 2),
(4, 'Alfredo Pasta', 'Creamy Alfredo pasta with grilled chicken.', 9.99, 0, 'pasta1.jpg', 3),
(5, 'Caesar Salad', 'Fresh Caesar salad with grilled chicken and Caesar dressing.', 6.99, 0, 'salad1.jpg', 4),
(6, 'Chocolate Cake', 'Decadent chocolate cake with layers of rich chocolate ganache.', 5.99, 0, 'dessert1.jpg', 5);

-- Insert sample data into Users table
INSERT INTO Users (user_id, username, password, email, first_name, last_name, address, phone) VALUES
(1, 'john_doe', 'password123', 'john@example.com', 'John', 'Doe', '123 Main St, Cityville', '555-1234'),
(2, 'jane_smith', 'pass456', 'jane@example.com', 'Jane', 'Smith', '456 Oak St, Townsville', '555-5678');

-- Insert sample data into Orders table
INSERT INTO Orders (order_id, user_id, order_date) VALUES
(1, 1, '2023-01-15'),
(2, 2, '2023-02-01');

-- Insert sample data into OrderDetails table
INSERT INTO OrderDetails (order_detail_id, order_id, product_id, quantity, subtotal) VALUES
(1, 1, 3, 2, 23.98),
(2, 1, 5, 1, 6.99),
(3, 2, 1, 1, 8.99),
(4, 2, 4, 1, 9.99);

-- Insert sample data into UserRoles table
INSERT INTO UserRoles (role_id, role_name) VALUES
(1, 'Customer'),
(2, 'Admin');

-- Insert sample data into UserRoleMapping table
INSERT INTO UserRoleMapping (user_id, role_id) VALUES
(1, 1),
(2, 1),
(2, 2);

-- Insert sample data into Checkout table
INSERT INTO Checkout (checkout_id, order_id, payment_method, total_amount, payment_status, transaction_id, payment_date) VALUES
(1, 1, 'Credit Card', 30.97, 'Paid', 'TRX123', '2023-01-15 15:30:00'),
(2, 2, 'PayPal', 18.98, 'Paid', 'TRX456', '2023-02-01 12:45:00');

