import React, { useEffect, useState } from "react"
import { Tooltip, Icon } from "antd"
import Axios from "axios"

function LikeDisLike(props) {
  let [likes, setLikes] = useState(0)
  let [likeAction, setLikeAction] = useState(null)

  let [Dislikes, setDisLikes] = useState(0)
  let [DislikeAction, setDisLikeAction] = useState(null)

  let variable = {}
  if (props.video) {
    variable = {
      videoId: props.videoId,
      userId: props.userId,
    }
  } else {
    variable = {
      commentId: props.commentId,
      userId: props.userId,
    }
  }
  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((res) => {
      if (res.data.success) {
        // 얼마나 많은 좋아요를 받았는지

        setLikes(res.data.likes.length)
        // 내가 이미 그 좋아요를 눌렀는지
        res.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked")
          }
        })
      } else {
        alert("좋아요 정보를 가져오지 못했습니다.")
      }
    })

    Axios.post("/api/like/getDisLikes", variable).then((res) => {
      if (res.data.success) {
        console.log("res.data: ", res.data)
        // 얼마나 많은 싫어요를 받았는지
        setDisLikes(res.data.disLikes.length)
        // 내가 이미 그 싫어요를 눌렀는지
        res.data.disLikes.map((disLike) => {
          if (disLike.userId === props.userId) {
            setDisLikeAction("disliked")
          }
        })
      } else {
        alert("싫어요 정보를 가져오지 못했습니다.")
      }
    }, [])
  })

  const onLike = () => {
    if (likeAction === null) {
      Axios.post("/api/like/upLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(likes++)
          setLikeAction("liked")

          if (DislikeAction !== null) {
            setDisLikeAction(null)
            setDisLikes(Dislikes--)
          }
        } else {
          alert("like올리기 실패")
        }
      })
    } else {
      Axios.post("/api/like/unLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(likes--)
          setLikeAction(null)
        } else {
          alert("like 내리기 실패")
        }
      })
    }
  }

  const onDiksLike = () => {
    if (DislikeAction !== null) {
      Axios.post("/api/like/unDislike", variable).then((res) => {
        if (res.data.success) {
          setDisLikes(Dislikes--)
          setDisLikeAction(null)
        } else {
          alert("dislike을 실패함")
        }
      })
    } else {
      Axios.post("/api/like/upDislike", variable).then((res) => {
        if (res.data.success) {
          setDisLikes(Dislikes++)
          setDisLikeAction("disliked")

          if (likeAction !== null) {
            setLikeAction(null)
            setLikes(likes--)
          }
        } else {
          alert("dislike을 실패함")
        }
      })
    }
  }
  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={likeAction === "liked" ? "filled" : "outlined"}
            onClick={onLike}
          ></Icon>
        </Tooltip>
      </span>

      <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>

      <span key="comment-basic-like">
        <Tooltip title="DisLike">
          <Icon
            type="dislike"
            theme={DislikeAction === "disliked" ? "filled" : "outlined"}
            onClick={onDiksLike}
          ></Icon>
        </Tooltip>
      </span>

      <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
    </div>
  )
}

export default LikeDisLike
