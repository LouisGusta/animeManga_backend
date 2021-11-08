const mongoose = require("mongoose");

const user_db = "dev-luis-gustavo";
const pass_db = "121433";

// change the server db
const URI = `mongodb+srv://${user_db}:${pass_db}@db-app-firefly.nwtxv.mongodb.net/manga-anime`;
 
const conn = async () => {
  try {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
  } catch (e) {
        console.log("DB connection has fail..!");
        console.log("this : ");
        console.log(e);
  }
};

module.exports = conn;