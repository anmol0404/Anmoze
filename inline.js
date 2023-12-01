import { TelegramClient, Api } from "telegram/index.js"
import { StringSession } from "telegram/sessions/index.js"
import { NewMessage } from "telegram/events/index.js"
import { NewMessageEvent } from "telegram/events/index.js"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const apiId = process.env.API_ID
const apiHash = process.env.API_HASH
const stringSession = new StringSession(process.env.SESSION)
// Create a new instance of the TelegramClient
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5
})

// Function to make an inline query to a bot
const makeInlineQuery = async () => {
  try {
    // Replace "bot_username" with the username of the bot you want to query
    const botUsername = "testgramjsbot"

    // Replace "something" with the query string
    const query = "something"

    // Make the inline query
    const results = await client.inlineQuery(botUsername, query)

    // Log the results
    console.log(results)

    // Example: Click on the first result
    if (results.length > 0) {
      await results[0].click()
    }
  } catch (error) {
    console.error("Error making inline query:", error)
  }
}

// Replace "your_session", "your_api_id", and "your_api_hash" with your actual values
client.start({
  phoneNumber: async () => "your_phone_number",
  password: async () => "your_password",
  phoneCode: async () => "your_phone_code",
  onError: (err) => console.log(err)
})

// Make the inline query after the client has started
client.addEventHandler(makeInlineQuery)
