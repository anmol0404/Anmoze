// deletedBlockedContacts.js

import { Api } from "telegram/index.js"
import { TelegramClient, errors } from "telegram/index.js"
import { StringSession } from "telegram/sessions/index.js"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config({ path: "../.env" })

const session = new StringSession(process.env.SESSION)
const apiId = process.env.API_ID
const apiHash = process.env.API_HASH
const client = new TelegramClient(session, apiId, apiHash, {})
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
await client.connect()

console.log("hello")
console.log(client)
;(async () => {
  try {
    // Get a list of blocked contacts
    const result = await client.invoke(new Api.contacts.GetBlocked({}))
    const blockedContacts = result.users.map((user) => ({
      userId: user.id,
      accessHash: user.accessHash,
      firstName: user.firstName
    }))

    // Delete blocked contacts
    for (const contact of newContactsToProcess) {
      console.log(`Deleting blocked contact name: ${contact.firstName}`)
      console.log("Delay of 3 seconds")
      await delay(3000)
      ;(async function run() {
        const result = await client
          .invoke(
            new Api.contacts.DeleteContacts({
              id: [
                new Api.InputUser({
                  userId: contact.userId,
                  accessHash: contact.accessHash
                })
              ]
            })
          )

          //   .then((data) => console.log(data))
          .catch((err) => console.error(err))
        // console.log(result) // prints the result
      })()
    }

    // Save the updated list of processed contacts
    fs.writeFileSync(
      "processedContacts.json",
      JSON.stringify(processedContacts)
    )

    console.log("All blocked contacts deleted successfully.")
  } catch (error) {
    if (error instanceof errors.FloodError) {
      console.error("API Limit exceeded. Flooding error.")
      console.log(`sleeping for ${error?.seconds} seconds`)
      delay(error?.seconds)
      // Handle flooding error (e.g., wait and retry)
    } else {
      //   console.error("Error occurred during API call:", error)
      console.error(error)
    }
  }
})()
