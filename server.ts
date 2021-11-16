import EventEmitter from 'events'
import net from 'net'
import readLine from "readline"

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

class Connection {
    public name: string
    private socket: net.Socket

    constructor(name: string, socket: net.Socket) {
        this.name = name
        this.socket = socket
    }

    sendMessage(msg: string) {
        this.socket.write(msg)
    }

    disconnect() {
        this.socket.destroy()
    }
}

class Server {
    private readonly socket: net.Server
    private readonly registry: Connection[] = []

    constructor(opts = {}) {
        this.socket = net.createServer()

        this.socket.on("connection", this.onConnect)
    }

    private readonly onDisconnect = (socket: net.Socket) => {
        console.log("disconnected")
    }

    private readonly onConnect = (socket: net.Socket) => {
        const connection = new Connection(String(Math.random()), socket)
        this.registry.push(connection)

        connection.sendMessage("Hello boi, wat iz ur name son")
        connection.sendMessage("DA POSHEL TI NAHUI PES")

        connection.disconnect()

    }

    listen(port: number, host: string) {
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