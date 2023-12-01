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

const allContacts = async () => {
  try {
    await client.connect()
    // Get a list of contacts
    const contacts = await client.invoke(new Api.contacts.GetContacts({}))

   
    for (const user of contacts.users) {
      console.log(` user Name: ${user.firstName} with id ${user.id} `)
      console.log("Delay of 3 seconds")
      await delay(3000)
    }

    console.log("Total contacts ", contacts.users.length)
    const data = contacts.users.map((user) => ({
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      username: user.username,
      accessHash: user.accessHash
    }))

    const contactjson = fs.writeFileSync(
      "allcontactsjson.json",
      JSON.stringify(data, null, 2)
    )

    console.log("All contacts blocked successfully.")
  } catch (error) {
    if (error instanceof errors.RPCError) {
      console.log("RPC ERROR")
    }
  }
}
allContacts()
export default allContacts
