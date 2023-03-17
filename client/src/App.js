import './App.css'
import io from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'


const socket = io.connect('http://localhost:3001')

function App() {

  const [message, setMessage] = useState('')
  const [recievedMessage, setRecievedMessage] = useState('')
  const [room, setRoom] = useState(0)
  const [user, setUser] = useState('cool chatter')
  socket.emit('join_room', room)

  function SendMessage() {
    let chat = document.getElementById('chatmessages')
    socket.emit('clickButton', {message, room})
    let newMessage = document.createElement('h4')
    newMessage.innerHTML = `${user}: ${message}`
    chat.appendChild(newMessage)
  }

  const joinRoom = () => {
    socket.emit('join_room', room)
  }
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      let chat = document.getElementById('chatmessages')
      setRecievedMessage(data)
      let newMessage = document.createElement('h4')
      newMessage.innerHTML = `${user}: ${data}`
      chat.appendChild(newMessage)
    })
  }, [socket])

  return (
    <div className="App">
      <div className='chatterName'>
        <input placeholder='name' onChange={(event) => {
          setUser(event.target.value)
        }}></input>
        <button>Set name</button>
      </div>

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
        <button onClick={joinRoom}>Join room</button>
      </div>

      <h1 className='Chat'>Room {room}
        <div className='userMessage' id='chatmessages'>

        </div>
      </h1>

    </div>
  );
}

export default App;
