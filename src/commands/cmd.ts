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
    if ( message.author.id === Ownerid || message.author.id === Client.user.id ) {
        if (message.content.slice(Prefix.length).trim().slice(cmd.length).trim().length !== 0) {
            const messagecontent1 = message.content.slice(Prefix.length).trim().slice(cmd.length).trim()
            const messagecontent2 = messagecontent1.replace( /!kanji!/g, function () { return kanjilist[Math.floor(Math.random()*kanjilist.length)]});
            await message.channel.send(messagecontent2);
        } else if (message.content.slice(Prefix.length).trim().slice(cmd.length).trim().length === 0) {
            message.reply(
                `エラー\n\`\`\` なんか言わせろや \`\`\``
            );
            console.log(`エラー\n なんか言わせろや`);
        }
    }
}
const info = {
    name: "cmd",
    description: "run command",
    category: "owner",
    args: "iroiro"
}

export { info };
