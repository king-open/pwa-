import  { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null)
  const [text, setText] = useState('')

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加发送图片和文本到服务器的逻辑
    console.log('Image:', image)
    console.log('Text:', text)
  }

  return (
    <div className="App">
      <h1>图文咨询</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Uploaded" style={{ maxWidth: '300px' }} />}
        </div>
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入咨询内容"
            rows="4"
            cols="50"
          />
        </div>
        <button type="submit">提交咨询</button>
      </form>
    </div>
  )
}

export default App
