import React, { useState } from "react"
import { useSelector } from "react-redux"
import Axios from "axios"
import SingleComment from "./SingleComment"

function Comment(props) {
  const [commentValue, setCommentValue] = useState("")
  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value)
  }

  const videoId = props.postId

  //redux에서 user가져오기
  const user = useSelector((state) => state.user)

  const onSubmit = (e) => {
    e.preventDefault()
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    }
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result)
        setCommentValue("")
      } else {
        alert("코멘트 저장 실패!")
      }
    })
  }
  return (
    <div>
      <br />

      <p> Replies</p>

      <br />

      {/* COMMENT LISTS */}
      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <SingleComment
                refreshFunction={props.refreshFunction}
                comment={comment}
                postId={videoId}
              />
            )
        )}

      {/* ROOT COMMENT FORM */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 입력해 주세요"
        />

        <br />
        <button style={{ widht: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Comment
