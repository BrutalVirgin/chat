import http from 'http';
import express from "express";
import { v4 as uuid } from 'uuid'
import mongoose from "mongoose"
import WebSocket, { WebSocketServer } from 'ws'
import { MongoDatabase } from "./database/mongoapi"


const hostname = '127.0.0.1'
const app = express();

async function start() {
    try {
        await mongoose.connect("mongodb+srv://Kirill:80503343041@chat.nzdrn.mongodb.net/Chat")
        console.log("database connected")
    } catch (e) {
        console.log(e)
    }

    const db = new MongoDatabase()
    const users: { id: string, ws: WebSocket.WebSocket }[] = []
    const messages: { name: any; message: any; }[] = []

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    }).listen(3000, hostname, () => console.log("server is running"))

    const wss = new WebSocketServer({ server: server })

    wss.on('connection', ws => {

        ws.send(JSON.stringify(messages))

        ws.on("message", async (data) => {
            const msg = JSON.parse(data.toString())

            if (msg.flag === "newUser") {
                const user = await db.getUserByName(msg.nickName)
                if (!user) {
                    const id = uuid()
                    users.push({ id, ws })
                    db.addUser(id, msg.nickName, msg.password)
                    ws.send(JSON.stringify("account created"))
                } else {
                    ws.send(JSON.stringify("already register"))
                }
            }

            if (msg.flag === "signIn") {
                const user = await db.getUserByName(msg.nickName)
                if (!user) {
                    ws.send(JSON.stringify("user not found"))
                } else {
                    user.password === msg.password ?
                        ws.send(JSON.stringify("confirm")) :
                        ws.send(JSON.stringify("incorrect password"))
                }
            }

            else {
                const id = uuid()
                users.push({ id, ws })

                const { name, message } = JSON.parse(data.toString())
                messages.push({ name, message })

                for (const user of users) {
                    user.ws.send(JSON.stringify([{ name, message }]))
                }
            }

        })
        ws.on('close', () => {
            console.log("disconnect")
        })
    })

}


start()




// server.listen(3000, () => console.log("Server started"))