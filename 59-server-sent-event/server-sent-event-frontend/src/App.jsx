import { useEffect, useState } from 'react'

function App() {
  const [log, setLog] = useState('')
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/stream')
    eventSource.onmessage = ({ data }) => {
      // 接收日志
      // console.log('New message', JSON.parse(data).msg)
      // setLog(JSON.parse(data).msg)

      // 接收buffer数据
      const res = JSON.parse(data)
      const uint = new Uint8Array(res.data)
      const str = new TextDecoder('utf-8').decode(uint)
      setLog(str)
    }
  }, [])

  return <div>{log}</div>
}

export default App
