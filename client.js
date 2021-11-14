const { waitForDebugger } = require('inspector')
const readLine = require("readline")
const net = require('net')
const { Socket } = require('dgram')

const client = new net.Socket()
const port = 7070
const host = '127.0.0.1'

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

let nickname = null

client.connect(port, host, function () {
    console.log('Connected')
    rl.question("What is your nickname? ", (answer) => {
        nickname = answer
        rl.question("", (msg) => {
            client.emit("data", msg)
        })
    })
    client.write("asdasdasd asdasdasd ")
})

client.on('data', function (data) {
    console.log('Server: ' + data)
})

client.on("end", function () {
    console.log("cleint left chat")
})

client.on('close', function () {
    console.log('Connection closed')
})

client.on("on", (data) => {
    console.log("dataasdasdasdasdasdasdasdasd: " + data)
})