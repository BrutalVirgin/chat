const app = express();
import http from 'http';
import express from "express";
import { v4 as uuid } from 'uuid'
import { writeFile } from "fs"
import WebSocket, { WebSocketServer } from 'ws'

const hostname = '127.0.0.1'

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}).listen(3000, hostname, () => console.log("server is running"))

const wss = new WebSocketServer({ server: server })

const users: { id: string, ws: WebSocket.WebSocket }[] = []
const messages: { name: any; message: any; }[] = []

wss.on('connection', ws => {
    const id = uuid()
    users.push({ id, ws })

    ws.send(JSON.stringify(messages))

    ws.on("message", (data) => {
        const { name, message } = JSON.parse(data.toString())
        messages.push({ name, message })

        for (const user of users) {
            user.ws.send(JSON.stringify([{ name, message }]))
        }
    })
    ws.on('close', () => {
        console.log("disconnect")
    })
})







// server.listen(3000, () => console.log("Server started"))