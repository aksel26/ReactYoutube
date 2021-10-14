const mongoose = require("mongoose")
const Schema = mongoose.Schema

const likeSchema = mongoose.Schema(
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

const Like = mongoose.model("Like", likeSchema)

module.exports = { Like }
