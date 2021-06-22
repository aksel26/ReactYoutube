import React from "react"
import { Row, Col, List } from "antd"
function VideoDetailPage() {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video style={{ width: "100%" }} scr controls />
          <List.Item actions>
            <List.Item.Meta avatar title description />
          </List.Item>
        </div>
      </Col>
      <Col lg={6} xs={24}>
        Side Videos
      </Col>
    </Row>
  )
}

export default VideoDetailPage
