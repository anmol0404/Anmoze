import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const session = new StringSession(process.env.SESSION);
const client = new TelegramClient(session, apiId, apiHash, {});

(async function run() {
    await client.connect(); // This assumes you have already authenticated with .start()
  
    const result = await client.invoke(
      new Api.messages.GetMessages({
        id: [43],
      })
    );
    
    console.log(result); // prints the result
  })();
