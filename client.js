const net = require('net')
const client = new net.Socket()
const port = 7070
const host = '127.0.0.1'

client.connect(port, host, function () {
    console.log('Connected')
    client.write("Hello From Client 2");
    process.stdin.on('data', function (data) {
        client.write(data)
    })
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






// client.on("on", (data) => {
//     console.log("dataasdasdasdasdasdasdasdasd: " + data)
//     client.end(

//     )
// })