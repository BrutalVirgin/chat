var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import EventEmitter from 'events'
import EventEmitter from 'events';
import net from 'net';
import readLine from "readline";
const port = 7070;
const host = '127.0.0.1';
// имя пользователя
// время отправки сообщения
// количество подсключенных пользователей
// вывод сообщения о отключенном пользователе
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
var MessageType;
(function (MessageType) {
    MessageType["AUTHORIZE"] = "AUTHORIZE";
})(MessageType || (MessageType = {}));
class Connection extends EventEmitter {
    constructor(name, socket) {
        super();
        this.name = name;
        this.socket = socket;
        this.socket.on("data", (msg) => {
            console.log(String(msg));
            // const [type, data] = this.parseMessage(msg)
            // if (type === MessageType.AUTHORIZE) {
            //     this.emit("authorize", data)
            // } else {
            //     this.emit("unexpected", msg)
            // }
        });
    }
    parseMessage(b) {
        return [MessageType.AUTHORIZE, {}];
    }
    askForNickname() {
        this.socket.write("nickname");
    }
    sendMessage(msg) {
        this.socket.write(msg);
    }
    disconnect() {
        this.socket.destroy();
    }
}
class Server {
    constructor(opts = {}) {
        this.registry = [];
        this.onDisconnect = (socket) => {
            console.log("disconnected");
        };
        this.onConnect = (socket) => {
            const connection = new Connection(String(Math.random()), socket);
            this.registry.push(connection);
            console.log("connected");
            connection.askForNickname();
            connection.on("authorize", (d) => {
                console.log("authorize", d);
            });
            connection.on("unexpected", (d) => {
                console.log("unexpected", d);
            });
            // connection.disconnect()
        };
        this.socket = net.createServer();
        this.socket.on("connection", this.onConnect);
    }
    listen(port, host) {
        this.socket.listen(port, host, () => {
            console.log('TCP Server is running on port ' + port + '.');
        });
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new Server({});
        server.listen(port, host);
    });
}
main();
