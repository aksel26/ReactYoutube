import React, { useEffect, useState } from "react"
import { FaCode } from "react-icons/fa"
import { Typography, Card, Row, Col, Divider, Avatar } from "antd"
import Axios from "axios"
import moment from "moment"

const { Title } = Typography
const { Meta } = Card

function LandingPage() {
  const [video, setVideo] = useState([])

  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setVideo(response.data.videos)
      } else {
        alert("비디오 가져오기 실패!")
      }
    })
    return () => {}
  }, [])

  const renderCards = video.map((video, index) => {
    var mins = Math.floor(video.duration / 60)
    var secs = Math.floor(video.duration - mins * 60)

    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div className="duration">
              <span>
                {mins}:{secs}
              </span>
            </div>
          </a>
          <br />
          <Meta
            description=""
            title={video.title}
            avatar={<Avatar src={video.writer.image} />}
          />
          <span>{video.writer.name}</span> <br />
          <span style={{ marginLeft: "3rem" }}>{video.views} views</span> -{" "}
          <span></span>
          <br />
        </div>
      </Col>
    )
  })
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>RECOMMENDED</Title>
      <hr />
      <Row gutter={[32, 16]}>
        {renderCards}
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: "relative" }}>
            <div className="duration"></div>
          </div>

          <br />
          <Meta description="" />
        </Col>
      </Row>
    </div>
  )
}

export default LandingPage
