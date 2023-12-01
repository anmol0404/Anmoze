import { TelegramClient } from "telegram/index.js"
import { NewMessage } from "telegram/events/index.js"
import { NewMessageEvent } from "telegram/events/index.js"
import auth, { client, stringSession } from "./auth.js"

// async function handler(event) {
//   console.log(event)
// }
// client.addEventHandler(handler, new NewMessage({}))

// await client.connect()
// if (await client.checkAuthorization()) {
//   console.log("I am logged in!")
// } else {
//   console.log(
//     "I am connected to telegram servers but not logged in with any account/bot"
//   )
// }
export default client
