import React, { useState } from "react"
import { Comment, Avatar, Button, Input } from "antd"
import Axios from "axios"
import { useSelector } from "react-redux"
import LikeDisLike from "./LikeDisLike"
function SingleComment(props) {
  const user = useSelector((state) => state.user)
  const [openReply, setOpenReply] = useState(false)
  const [CommentValue, setCommentValue] = useState("")

  const onClickReplyOpen = () => {
    setOpenReply(!openReply)
  }

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value)
  }

  const actions = [
    <LikeDisLike
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span onClick={onClickReplyOpen} key="comment-basic--reply-to">
      Reply to
    </span>,
  ]
  const onSubmit = (e) => {
    e.preventDefault()

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    }
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("")
        setOpenReply(false)
        props.refreshFunction(response.data.result)
      } else {
        alert("코멘트 저장 실패!")
      }
    })
  }

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={props.comment.content}
      />
      {openReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 입력해 주세요"
          />

          <br />
          <button style={{ widht: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default SingleComment
