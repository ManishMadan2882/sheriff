const mongoose = require("mongoose");

const dbStart = async (connectionUrl) => {
  await mongoose.connect(connectionUrl);
  console.log("Connected to database");
};

module.exports = dbStart;
