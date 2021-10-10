const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamp: true }
) // 만든날짜 , updqte날짜가 표시됨

const Comment = mongoose.model("comment", commentSchema)

module.exports = { Comment }
