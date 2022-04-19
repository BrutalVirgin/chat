import { Schema, model } from 'mongoose'

const user = new Schema({
    id: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const userShema = model('Test', user)
export { userShema }