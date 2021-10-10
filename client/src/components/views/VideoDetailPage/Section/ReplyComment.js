import React, { useState } from "react"
import SingleComment from "./SingleComment"
import { useEffect } from "react"

function ReplyComment(props) {
  const [childeCommentNumber, setChildeCommentNumber] = useState(0)

  const [OpenReplyComment, setOpenReplyComment] = useState(false)

  useEffect(() => {
    let commentNumber = 0

    props.commentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++
      }
    })

    setChildeCommentNumber(commentNumber)
  }, [props.commentList])

  const rederReplyComment = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              refreshFunction={props.refreshFunction}
              comment={comment}
              postId={props.videoId}
            />
            <ReplyComment
              refreshFunction={props.refreshFunction}
              parentCommentId={comment._id}
              postId={props.postId}
              commentList={props.commentList}
              comment={comment}
            />
          </div>
        )}
      </React.Fragment>
    ))

  const onHandleChange = () => {
    setOpenReplyComment(!OpenReplyComment)
  }

  return (
    <div>
      {childeCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onHandleChange}
        >
          View {childeCommentNumber}more Comments
        </p>
      )}

      {OpenReplyComment && rederReplyComment(props.parentCommentId)}
    </div>
  )
}

export default ReplyComment
