const { waitForDebugger } = require('inspector')
const readLine = require("readline")
const net = require('net')
const { Socket } = require('dgram')

const client = new net.Socket()
const port = 7070
const host = '127.0.0.1'

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stout
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

    client.write("Hello From Client 2");
    process.stdin.on('data', function (data) {
        client.write(data)
    })
})

client.on('data', function (data) {
    // setName(data)
    console.log('Server: ' + data)
})

client.on("end", function () {
    console.log("cleint left chat")
})

client.on('close', function () {
    console.log('Connection closed')
})

function setName(sock) {
    console.log("Enter your nickname:")
    process.stdin.on('data', function (data) {
        return sock.name = data
    })
}


// client.on("on", (data) => {
//     console.log("dataasdasdasdasdasdasdasdasd: " + data)
//     client.end(

//     )
// })