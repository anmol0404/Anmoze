// blockContacts.js
import { Api } from "telegram/index.js"
import { TelegramClient, errors } from "telegram/index.js"
import { StringSession } from "telegram/sessions/index.js"
import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

const session = new StringSession(process.env.SESSION)
const apiId = process.env.API_ID
const apiHash = process.env.API_HASH
const client = new TelegramClient(session, apiId, apiHash, {})
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
import fs from "fs"

console.log(client)

const blockContacts = async () => {
  try {
    await client.connect()
    // Get a list of contacts
    const contacts = await client.invoke(new Api.contacts.GetContacts({}))

    // Block each contact
    for (const user of contacts.users) {
      console.log(`Blocking user Name: ${user.firstName} with id ${user.id} `)
      console.log("Delay of 3 seconds")
      await delay(3000)

      await client
        .invoke(
          new Api.contacts.Block({
            id: new Api.InputPeerUser({
              userId: user.id,
              accessHash: user.accessHash
            })
          })
        )
        .then((data) => console.log(data))
        .catch((err) => console.error(err))
    }

    console.log("All contacts blocked successfully.")
  } catch (error) {
    if (error instanceof errors.RPCError) {
      console.log("RPC ERROR")
    } else {
      console.error(error)
    }
  }
}
blockContacts()
export default blockContacts
