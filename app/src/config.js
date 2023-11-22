const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connect = mongoose
  .connect("mongodb://localhost:27017/food-shop")
  .then(() => {
    console.log("Connect mongo success");
  })
  .catch(() => console.log("Connect mongo false"));

const LoginSchema = new Schema({    
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", LoginSchema);

module.exports = UserModel;
