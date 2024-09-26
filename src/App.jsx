import { useState, useRef } from 'react'
import 'uno.css'

function App() {
  const [image, setImage] = useState(null)
  const [text, setText] = useState('')
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加发送图片和文本到服务器的逻辑
    console.log('Image:', image)
    console.log('Text:', text)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">图文咨询</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer w-full max-w-sm"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          {image ? (
            <div className="relative inline-block">
              <img src={image} alt="Uploaded" className="max-w-full max-h-72" />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100"
              >
                删除图片
              </button>
            </div>
          ) : (
            <p>拖拽图片到这里或点击上传</p>
          )}
        </div>
        <div className="w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入咨询内容"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          提交咨询
        </button>
      </form>
    </div>
  )
}

export default App
