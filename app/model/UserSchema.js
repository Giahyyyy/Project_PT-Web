const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    facebookId: {
        type: String,
    },
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
            validator: validator.isEmail,
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    profileImage: {
        type: String,
        default: '/uploads/user-img/default.png', 
      },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
});

// Do not hash the password before saving to the database

// Method to verify the provided password
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
