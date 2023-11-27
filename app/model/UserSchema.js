const mongoose = require('mongoose');
const validator = require('validator'); // Thêm dòng này để import validator

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please enter a name"],
        minlength: 2,
    },
    last_name: {
        type: String,
        required: [true, "Please enter a name"],
        minlength: 2,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        validate: {
            validator: validator.isEmail, // Đảm bảo bạn đã import validator ở đầu file
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    image: {
        type: String, // Chỉnh sửa "string" thành "String"
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

module.exports = mongoose.model("User", UserSchema);
