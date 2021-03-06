import React, { useState } from "react"
import { Typography, Button, Form, Input, Divider, Icon, message } from "antd"
import DropZone from "react-dropzone"
import Axios from "axios"
import { useSelector } from "react-redux"

const { Title } = Typography
const { TextArea } = Input

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
]
const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
]
function VideoUploadPage(props) {
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Category, setCategory] = useState("Film & Animation")
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [Thumbnail, setThumbnail] = useState("")
  const user = useSelector((state) => state.user)

  // =====================================
  // 정보 부분
  // =====================================
  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value)
  }
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value)
  }
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value)
  }

  // =====================================
  // Drag & Drop 부분
  // =====================================
  const onDrop = (files) => {
    let formData = new FormData()
    const config = {
      header: { "content-type": "multipart/form-data" },
    }

    //파일 추가
    formData.append("file", files[0])

    Axios.post("/api/video/uploadFiles", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          url: response.data.url,
          filename: response.data.filename,
        }

        setFilePath(response.data.url)
        Axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration)
            setThumbnail(response.data.url)
          } else {
            alert("썸네일 생성 실패!")
          }
        })
      } else {
        alert("비디오 업로드를 실패했습니다.")
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: Thumbnail,
    }
    Axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        message.success("업로드 성공!")
        setTimeout(() => {
          props.history.push("/")
        }, 3000)
      } else {
        alert("비디오 업로드 실패!")
      }
    })
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* DropZone */}

          <DropZone onDrop={onDrop} multiple={false} maxSize={1000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgrey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon
                  type="plus"
                  style={{
                    fontSize: "3rem",
                  }}
                />
              </div>
            )}
          </DropZone>
          {/* Detail Zone */}
          {Thumbnail && (
            <div>
              <img src={`http://localhost:5000${Thumbnail}`} alt="thumbnail" />
            </div>
          )}
        </div>

        <br />

        <br />

        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle}></Input>

        <br />
        <br />
        <label> Description</label>
        <TextArea onChange={onDescriptionChange} value={Description}></TextArea>
        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
