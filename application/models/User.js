const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    username: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    Name: {
      type: String,
    },
    numOfRepos: {
      type: String,
    },
    bio: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
