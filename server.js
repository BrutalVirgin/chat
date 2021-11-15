const net = require('net')
const port = 7070
const host = '127.0.0.1'



const server = net.createServer()
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.')
})

class Server {

    connectedClient = {
        "name": socket
    }

    constructor(opts = {}) {
        this.socket = net.createServer()

        this.socket.on("connection", this.onConnect)
    }

    onConnect(socket) {
        const userName = ""

        // client with name connected

        this.connectedClient = [...]
    }

    onDisconnect(socket) {
        // client with name disconnected

        this.connectedClient = [...]
    }
}

async function main() {
    const server = new Server({})

    server.listen()
}

let sockets = []
server.on('connection', function (sock) {
    console.log('CONNECTED: 1')

    console.log(sock.remoteAddress + ':' + sock.remotePort)
    sockets.push(sock)
    sock.on('data', function (data) {
        console.log(sock.remotePort + ": " + data)
        sockets.forEach(function (sock, index, array) {
            sock.write(sock.remotePort + ": " + data);
        })
    })

    sock.on('close', function (data) {
        let index = sockets.findIndex(function (o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: 1');
    });

})

