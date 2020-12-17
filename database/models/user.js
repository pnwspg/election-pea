const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    level: { type: String, default:"normal" },

  },
  {
    collection: "users", // collection ต้องตรงใน mongodb เลย
  }
);

const user = mongoose.model("Users", schema);

module.exports = user;
