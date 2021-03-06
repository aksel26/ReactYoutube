import React, { useEffect, useState } from "react"
import { Row, Col, List, Avatar } from "antd"
import axios from "axios"
import SideVideo from "./Section/SideVideo"
import Subscribe from "./Section/Subscribe"
import Comment from "./Section/Comment"
import LikeDisLike from "./Section/LikeDisLike"
function VideoDetailPage(props) {
  const videoId = props.match.params.videoId
  const variable = { videoId: videoId }
  const [VideoDetail, setVideoDetail] = useState([])

  const [comments, setcomments] = useState([])
  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail)
      } else {
        alert("비디오 가져오기 실패!")
      }
    })

    axios.post("/api/comment/getComments", variable).then((response) => {
      if (response.data.success) {
        setcomments(response.data.comments)
        console.log(comments)
      } else {
        alert("코멘트 조회 실패!")
      }
    })
    return () => {}
  }, [])

  const refreshFunction = (newComments) => {
    setcomments(comments.concat(newComments))
  }
  if (VideoDetail.writer) {
    console.log(VideoDetail)
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    )
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${VideoDetail?.filePath}`}
              controls
            />
            <List.Item
              actions={[
                <LikeDisLike
                  video
                  userId={localStorage.getItem("userId")}
                  videoId={videoId}
                />,
                subscribeButton,
              ]}
            >
              <List.Item.Meta
                // avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail?.writer?.name}
                description={VideoDetail?.description}
              />
            </List.Item>
            {/* Comment */}
            <Comment
              refreshFunction={refreshFunction}
              commentList={comments}
              postId={videoId}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default VideoDetailPage
