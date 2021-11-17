const { waitForDebugger } = require('inspector')
const readLine = require("readline")
const net = require('net')
const { Socket } = require('dgram')
const { R_OK } = require('constants')
const { Console } = require('console')

const client = new net.Socket()
const port = 7070
const host = '127.0.0.1'

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})



client.connect(port, host, function () {
 

})

client.on('data', function (data) {
    if(data==="как тиебя зовут?") {
        rl.question("как тиебя зовут?", (answer)=> {
            client.write(answer)
        })
    }
    console.log('Server: ' + data)
})

// client.on("end", function () {
//     console.log("cleint left chat")
// })

// client.on('close', function () {
//     console.log('Connection closed')
// })

client.on("on", (data) => {
    console.log("dataasdasdasdasdasdasdasdasd: " + data)
})