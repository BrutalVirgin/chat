import WebSocket from "ws"
import { userShema } from "./models/user"

class MongoDatabase {

    async addUser(id: string, nickName: string, password: string) {
        try {
            const user = await new userShema({ id, nickName, password })
            await user.save()
            return user
        } catch (e) {
            console.log(e)
        }
    }

    async getUserByName(nickname: string) {
        try {
            const user = await userShema.findOne({ nickName: nickname }).exec()
            return user
        } catch (e) {
            console.log(e)
        }
    }
}

export { MongoDatabase }