const mongoose = require("mongoose")
const Schema = mongoose.Schema

const videoSchema = mongoose.Schema(
  {
    writer: {
      // 이렇게 지정해주면 User스키마에 가서 모든 User스키마의 모든 정보들을 불러올 수 있다.
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: { type: String },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamp: true }
) // 만든날짜 , updqte날짜가 표시됨

const Video = mongoose.model("Video", videoSchema)

module.exports = { Video }
