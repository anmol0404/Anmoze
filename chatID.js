import axios from "axios"

const BOT_TOKEN = "6871995616:AAFgtY4rKTimO_gzR4RIN9kjzE9FeMwucLE"

async function getChatId() {
  try {
    // Replace 'your_username' with the username of the user you want to get updates for
    const username = "your_username"

    // Get information about the user (including chat ID) using the 'getChat' method
    const chatInfoResponse = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChat`,
      {
        chat_id: username
      }
    )

    // Extract the chat ID
    const chatId = chatInfoResponse.data.result.id

    console.log("Chat ID:", chatId)
  } catch (error) {
    console.error("Error fetching chat information:", error.message)
  }
}

getChatId()
