import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import fs from "fs";


dotenv.config({ path: ".env" });

const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const session = new StringSession(process.env.SESSION);
const client = new TelegramClient(session, parseInt(apiId), apiHash, {});


(async function run() {
    await client.connect(); // This assumes you have already authenticated with .start()

    const result = await client.invoke(
        new Api.channels.GetParticipants({
            channel: "drama_think",
            filter: new Api.ChannelParticipantsRecent({}),
            offset: 43,
            limit: 100,
            hash: BigInt("0"),
        })
    );
    const extractedData = result.users.map(user => ({
        username: user.username || '', // Handle cases where username may be null
        accessHash: user.accessHash || 0, // Replace 0 with a default value if accessHash is not available
        id: user.id || 0, // Replace 0 with a default value if accessHash is not available
        firstName: user.firstName || "", // Replace 0 with a default value if accessHash is not available
    }));
    const filePath = 'myGroupMember.json';
    const jsonData = JSON.stringify(extractedData, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
    console.log(result);
})();