// blockContacts.js
import { Api } from "telegram/index.js"
import { TelegramClient, errors } from "telegram/index.js"
import { StringSession } from "telegram/sessions/index.js"
import { NewMessage } from "telegram/events/index.js"
import { NewMessageEvent } from "telegram/events/index.js"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const session = new StringSession(process.env.SESSION)
const apiId = process.env.API_ID
const apiHash = process.env.API_HASH
const client = new TelegramClient(session, apiId, apiHash, {})
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// import fs from "fs"

// console.log(client)

;(async function handler(event) {
  const message = event
  console.log(message)
  //   // Checks if it's a private message (from user or bot)
  //   if (event.isPrivate) {
  //     // prints sender id
  //     console.log(message.senderId)
  //     // read message
  //     if (message.text == "hello") {
  //       const sender = await message.getSender()
  //       console.log("sender is", sender)
  //       await client.sendMessage(sender, {
  //         message: `hi your id is ${message.senderId}`
  //       })
  //     }
  //   }
})(new NewMessageEvent({}))
// handler()
// adds an event handler for new messages
// client.addEventHandler(handler, new NewMessage({}))

// eventPrint()
// adds an event handler for new messages
// client.addEventHandler(eventPrint, new NewMessage({}))
// export default eventPrint
