//import EventEmitter from 'events'
import EventEmitter from 'events'
import net from 'net'
import readLine from "readline"

console.log("ZALUPA1")

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

enum MessageType {
    AUTHORIZE = "AUTHORIZE"
}

class Connection extends EventEmitter {
    public name: string
    private socket: net.Socket



    constructor(name: string, socket: net.Socket) {
        super()
        this.name = name
        this.socket = socket

        this.socket.on("data", (msg) => {
            const [type, data] = this.parseMessage(msg)

            if (type === MessageType.AUTHORIZE) {
                this.emit("authorize", data)
            } else {
                this.emit("unexpected", msg)
            }
        })
    }

    parseMessage(b: Buffer): [MessageType, Record<string, string>] {
        return [MessageType.AUTHORIZE, {}]
    }

    askForNickname() {
        this.socket.write("nickname")
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

        console.log("connected")

        connection.askForNickname()

        connection.on("authorize", (d) => {
            console.log("authorize", d)
        })
        connection.on("unexpected", (d) => {
            console.log("SHOTA TAM", d)
        })

        // connection.disconnect()
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