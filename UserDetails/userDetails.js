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
  
    // const result = await client.invoke(
    //     new Api.users.GetFullUser({
    //       id: ["drama_think"],
    //     })
    //   );
    const result2 = await client.invoke(
        new Api.users.GetUsers({
          id: ["anmol"],
        })
      );
    console.log(result2); // prints the result
  })();