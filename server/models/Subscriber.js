const mongoose = require("mongoose")
const Schema = mongoose.Schema

const subscriberSchema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
) // 만든날짜 , updqte날짜가 표시됨

const Subscriber = mongoose.model("Subscriber", subscriberSchema)

module.exports = { Subscriber }
