const express = require("express")
const router = express.Router()
const { Video } = require("../models/Video")

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

//=================================ㄴ
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

router.post("/uploadVideo", (req, res) => {
  // 비디오 정보들을 저장한다.

  //클라이언트단에서의 정보가 모두 requ에 담겨잇다.
  const video = new Video(req.body)

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    res.status(200).json({ success: true })
  })
})

router.get("/getVideos", (req, res) => {
  //비디오를 DB에서 가져와서 client에 보낸다.
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, videos })
    })
})

router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err)
      return res.status(200).json({ success: true, videoDetail })
    })
})

router.post("/thumbnail", (req, res) => {
  //썸네일 생성하고 비디오 러닝 타임도 가젹오기
  // 러닝타임을 가져오기 위해 ffmpeg 사용

  let filePath = ""
  let fileDuration = ""
  // 비디오 정보 가져오기
  // 비디오의 duration을 가져오려면 ffprobe를 이용하면 된다

  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    fileDuration = metadata.format.duration
  })

  //썸네일 생성
  ffmpeg(req.body.url)
    .on("filenames", (filenames) => {
      console.log("will generate : ", filenames.join(", "))
      console.log(filenames)

      filePath = "/uploads/thumbnails/" + filenames[0]
    })

    .on("end", () => {
      console.log("Screenshots taken")
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      })
    })
    .on("error", (res) => {
      console.log(err)
      return res.json({ success: "false", err })
    })

    .screenshots({
      //3의 썸네일 가능
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png",
    })
})
module.exports = router
