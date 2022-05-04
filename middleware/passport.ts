const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
import { jwtkey } from "../utils/keys"
import { MongoDatabase } from "../database/mongoapi"

import passport from "passport";

const db = new MongoDatabase()

// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: jwtkey
// }

// // function passport() {
// //     passport.use(
// //         new JwtStrategy(options, (payload: any, done: any) => {
// //             const user = await db.getUserByName(msg.nickName)
// //         })

// //     )
// //     return ""
// // }

// export { }

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtkey
}

passport.use(new JwtStrategy(opts, async function (payload: { nickName: string; }, done: (arg0: null, arg1: boolean) => any) {
    try {
        const user = await db.getUserByName(payload.nickName)

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    } catch (e) {
        console.log(e)
    }
}))
