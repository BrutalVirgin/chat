const net = require('net')
const readLine = require("readline")
const port = 7070
const host = '127.0.0.1'

// имя пользователя
// время отправки сообщения
// количество подсключенных пользователей
// вывод сообщения о отключенном пользователе

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

class Server {
    constructor(opts = {}) {
        this.socket = net.createServer()

        this.socket.on("connection", this.onConnect)
    }

    onConnect(socket) {

        console.log("socket connected", socket)
        socket.on("closed")
    }


    onDisconnect(socket) {
        // client with name disconnected
    }

    listen(port, host) {
        this.socket.listen(port, host, () => {
            console.log('TCP Server is running on port ' + port + '.')
        })

    }
}



async function main() {
    const server = new Server({})

    server.listen(port, host)
}

main()

// let sockets = []
// server.on('connection', function (sock) {
//     console.log('CONNECTED: 1')

//     console.log(sock.remoteAddress + ':' + sock.remotePort)
//     sockets.push(sock)
//     sock.on('data', function (data) {
//         console.log(sock.remotePort + ": " + data)
//         sockets.forEach(function (sock, index, array) {
//             sock.write(sock.remotePort + ": " + data);
//         })
//     })

//     sock.on('close', function (data) {
//         let index = sockets.findIndex(function (o) {
//             return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
//         })
//         if (index !== -1) sockets.splice(index, 1);
//         console.log('CLOSED: 1');
//     });

// })

