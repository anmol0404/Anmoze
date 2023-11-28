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
      new Api.messages.SendMessage({
        peer: "drama_think",
        randomId: BigInt("-4156887774564"),
        flags: {
            0: true, // Set the flag to indicate that replyToMsgId is present
            1: true, // Set the flag to indicate no_webpage
          },
        noWebpage: true,
        silent: false, // By default, silent is false (notifications are enabled)
        background: false, // By default, background is false (it's not a background message)
        clearDraft: false, // By default, clearDraft is false
        noforwards: true, 
        replyToMsgId: 8176,
        message: "Hello there!",// Replace with the actual message ID to which this message will reply to
        scheduleDate: 0, // Replace with the scheduled message date for scheduled messages
        sendAs: 'anmol_013', // Replace with the specified peer to send the message as
  
      })
    );
    console.log(result); // prints the result
  })();

  (async function run1() {
    await client.connect(); // This assumes you have already authenticated with .start()
  
    const result = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: "drama_think",
      })
    );
    console.log(result); // prints the result
  })();
  