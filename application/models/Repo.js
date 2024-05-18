const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: boolean,
      required: true,
      default: false
    },
    url: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Repo = mongoose.model("Repo", repoSchema);

module.exports = Repo;
