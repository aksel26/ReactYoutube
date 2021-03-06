const mongoose = require("mongoose")
const Schema = mongoose.Schema

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },

    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamp: true }
) // 만든날짜 , updqte날짜가 표시됨

const DisLike = mongoose.model("DisLike", dislikeSchema)

module.exports = { DisLike }
