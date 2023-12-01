import { Api, TelegramClient } from "telegram"
import { StringSession } from "telegram/sessions/index.js"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })
const apiId = process.env.API_ID
const apiHash = process.env.API_HASH
const sessionString = process.env.SESSION

console.log(apiId, apiHash)

const session = new StringSession(sessionString)
const client = new TelegramClient(session, apiId, apiHash, {})

async function run() {
  await client.connect()

  const result = await client.invoke(
    new Api.contacts.ResolveUsername({
      username: "aatma_2502"
    })
  )

  console.log(result)
}

run()
