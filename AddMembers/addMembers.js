import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import { getJsonData,iterateWithDelay } from  "../Utils/getJsonData" // Replace with the actual filename

dotenv.config({ path: ".env" });
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const session = new StringSession(process.env.SESSION);
const client = new TelegramClient(session, parseInt(apiId), apiHash, {});


export async function run(userId, hash) {
  await client.connect(); // This assumes you have already authenticated with .start()
  const inputUser = new Api.InputUser({
    userId: parseInt(userId),
    accessHash: BigInt(hash), // Replace with the actual access hash of the user
  });
  const result = await client.invoke(
    new Api.channels.InviteToChannel({
      channel: "drama_think",
      users: [inputUser],
    })
  )
  console.log(result);  // prints the result
};


(async () => {
  try {
    const result = await getJsonData();
    console.log(result);
    iterateWithDelay(0, result);

  } catch (error) {
    // Handle error
  }
})();





