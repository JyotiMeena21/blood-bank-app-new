const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connnected to mongodb");
  } catch (e) {
    console.log(e + " in mongoose");
  }

}

module.exports = connectDB;
