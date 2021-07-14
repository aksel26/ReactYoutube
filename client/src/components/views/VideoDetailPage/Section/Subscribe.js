import React, { useEffect, useState } from "react"
import axios from "axios"

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)
  useEffect(() => {
    let variable = { userTo: props.userTo }
    axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber)
      } else {
        alert("구독자 수를 받아오지 못했습니다.")
      }
    })
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    }

    axios
      .post("/api/subscribe/subscribed", subscribedVariable)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed)
        } else {
          alert("정보를 받아오지 못했습니다.")
        }
      })
    return () => {}
  }, [])

  const onSubscribe = () => {
    let subscribeVariabe = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    }

    if (Subscribed) {
      //이미 구독중
      axios
        .post("/api/subscribe/unsubscribed", subscribeVariabe)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1)
            setSubscribed(!Subscribed)
          } else {
            alert("구독취소 실패")
          }
        })
    } else {
      //구독중이 아닐경우
      axios
        .post("/api/subscribe/subscribe", subscribeVariabe)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1)
            setSubscribed(!Subscribed)
          } else {
            alert("구독취소 실패")
          }
        })
    }
  }
  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "subscribe"}
      </button>
    </div>
  )
}

export default Subscribe
