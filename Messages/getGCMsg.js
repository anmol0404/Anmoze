import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const session = new StringSession(process.env.SESSION);
const client = new TelegramClient(session, parseInt(apiId), apiHash, {});

(async function run() {
    await client.connect(); // This assumes you have already authenticated with .start()
    
    const result = await client.invoke(
      new Api.messages.GetHistory({
        peer: "drama_think",
        // offsetId: 43,
        // offsetDate: 43,
        // addOffset: 0,
        limit: 1,
        maxId: 0,
        minId: 0,
        // hash: BigInt("-4156887774564"),
      })
    );
    console.log(result.messages); // prints the result
  })();
