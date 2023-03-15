import './App.css'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'


const socket = io.connect('http://localhost:3001')



function App() {

  const [message, setMessage] = useState('')
  const [recievedMessage, setRecievedMessage] = useState('')

  function SendMessage() {
    socket.emit('clickButton', message)
  }

  useEffect(() => {
    socket.on('recieveMessage', (data) => {
      setRecievedMessage(data)
    })
  }, [socket])
  return (
    <div className="App">
      <input placeholder='message' onChange={(event) => {
        setMessage(event.target.value)
        console.log(message)
      }}></input>
      <button onClick={SendMessage}>Send Message</button>
      <h1>Message: {recievedMessage}</h1>
    </div>
  );
}

export default App;
