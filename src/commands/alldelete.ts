import * as Discord from "discord.js-selfbot-v13";
import { Ownerid, Prefix } from "../envs";
import kanjilist from '../kanji.json';
import * as Logger from "../utils/logger";

/**
 * Replies with some info about the bot host
 * @param {Discord.Client} Client the client
 * @param {Discord.Message} Message the message that contains the command name
 * @param {string[]} args the command args
 * @param {any} options some options
 */

export async function run(Client: Discord.Client, message: Discord.Message, cmd) {
    const messages = await message.channel.messages.fetch({ limit: 100 });
    const filtered = messages.filter(message => message.author.id === Client.user.id);
    if (filtered) {
        if (message.channel.type === "GUILD_TEXT") {
            await message.channel.bulkDelete(filtered);
        };
    };
};

const info = {
    name: "alldelete",
    description: "your bot's message deleter",
    category: "owner",
    args: "none"
};

export { info };
