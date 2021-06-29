import React, { useEffect, useState } from "react"
import Axios from "axios"

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([])
  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos)
      } else {
        alert("비디오 가져오기 실패!")
      }
    })
    return () => {}
  }, [])

  const renderSideVideo = SideVideos.map((video, index) => {
    var mins = Math.floor(video.duration / 60)
    var secs = Math.floor(video.duration - mins * 60)
    return (
      <div
        style={{ display: "flex", marginBottom: "1rem", padding: "0.2rem" }}
        key={index}
      >
        <div style={{ width: "40%", marginBottom: "1rem" }}>
          <a>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a style={{ color: "grey" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {" "}
              {video.title}
            </span>
            <br />
            <span> {video.wrtier}</span>
            <span> {video.views}</span>
            <span key={index}>
              {" "}
              {mins} :{secs}
            </span>
          </a>
        </div>
      </div>
    )
  })

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }}>{renderSideVideo}</div>
    </React.Fragment>
  )
}

export default SideVideo
