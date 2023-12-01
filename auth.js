// auth.js

import { TelegramClient, errors } from "telegram/index.js"
import { StringSession } from "telegram/sessions/index.js"
import { NewMessage } from "telegram/events/index.js"

import dotenv from "dotenv"

dotenv.config({ path: ".env" })

const apiId = process.env.API_ID
const apiHash = process.env.API_HASH

const stringSession = new StringSession(process.env.SESSION)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5
})

console.log(client)
const clientJSON = JSON.stringify(client)
const auth = async () => {
  try {
    console.log("Loading interactive example...")
    await client.start({
      phoneNumber: async () => await input.text("Please enter your number: "),
      password: async () => await input.text("Please enter your password: "),
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err)
    })

    console.log("You should now be connected.")

    async function handler(event) {
      const userIdFromUpdate = event.originalUpdate.userId?.value.toString()
      // const message = event.originalUpdate.message

      // console.log("Received message from user ID:", userIdFromUpdate)
      console.log(event.originalUpdate.message)

      if (userIdFromUpdate === "5718674458") {
        console.log("Receiver is Saurav")
      }
    }

    client.addEventHandler(handler, new NewMessage({}))

    return client
  } catch (error) {
    console.error("Error occurred during authentication:", error)
    throw error
  }
}
auth()

export default auth
export { client, stringSession, apiId, apiHash }
