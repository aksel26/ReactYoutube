const express = require("express")
const router = express.Router()
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth")
const multer = require("multer")
var ffmpeg = require("fluent-ffmpeg")

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only use mp4 is allowed"), false)
    }
    cb(null, true)
  },
})

const upload = multer({ storage: storage }).single("file")

//=================================
//             Video
//=================================
router.post("/uploadFiles", (req, res) => {
  // 클라이엔트에서 받은 비디오를 서버에 저장한다.
  // multer필요

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false }, err)
    }

    return res.json({
      success: true,
      url: res.req.file.path,
      filename: res.req.file.filename,
    })
  })
})
router.post("/thumbnail", (res, req) => {
  //썸네일 생성하고 비디오 러닝 타임도 가젹오기
})
module.exports = router
