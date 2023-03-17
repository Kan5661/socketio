import './App.css'
import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import {fabric} from 'fabric'


const socket = io.connect('http://localhost:3001')

function App() {

  const [message, setMessage] = useState('')
  const [recievedMessage, setRecievedMessage] = useState('')
  const [isFreeDraw, setIsFreeDraw] = useState(true)
  const [room, setRoom] = useState('')
  
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: 'white',
      height: 1000,
      width: 900,
      borderColor: 'black',
      borderWidth: 2,
      isDrawingMode: isFreeDraw
    })

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 210,
      height: 110,
      fill: 'green'
    })

    const circle = new fabric.Circle({
      radius: 50, 
      fill: 'blue',
      left: 0, right: 0
    })

    circle.set({'left': 100, 'top': 200, 'strokeWidth': 2, 'stroke': 'red'})
    
    canvas.add(rect, circle)

    return () => {
      canvas.dispose()
    }

  }, [isFreeDraw])

  function SendMessage() {
    socket.emit('clickButton', {message, room})
  }

  const joinRoom = () => {
    socket.emit('join_room', room)
  }
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setRecievedMessage(data)
      console.log('render')
    })
  }, [socket, canvasRef])

  return (
    <div className="App">

      <h1>Message: {recievedMessage}</h1>
      <div className='message'>
        <input placeholder='message' onChange={(event) => {
          setMessage(event.target.value)
          console.log(message)
        }}></input>
      <button onClick={SendMessage}>Send Message</button>
      </div>

      <div className='room'>
        <input placeholder='room code' onChange={(event) => {
          setRoom(event.target.value)
          console.log(room)
        }}></input>
        <button onClick={joinRoom}>create room</button>
      </div>

      <button onClick={() => {
        setIsFreeDraw(isFreeDraw? false : true)
        console.log(isFreeDraw)
        }}>pencil</button>
      <canvas ref={canvasRef} id='canvas'></canvas>
    </div>
  );
}

export default App;
