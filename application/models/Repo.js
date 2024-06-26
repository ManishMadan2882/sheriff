const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    url: {
      type: String,
      unique: true,
    },
    path: {
      type: String,
    },
  },
  { timestamps: true }
);

const Repo = mongoose.model("Repo", repoSchema);

module.exports = Repo;
