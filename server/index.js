// https://www.youtube.com/watch?v=djMy4QsPWiI&t=283s

import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })

    socket.on('clickButton', (data) => {
        console.log(data)
        socket.to(Number(data.room)).emit('receiveMessage', data.message)
        // socket.broadcast.emit('receiveMessage',data.message)
    })

    socket.on('join_room', (data) => {
        socket.join(Number(data))
        console.log(`user joined ${data}`)
    })
})

server.listen(3001, () => {
    console.log("server is running")
})