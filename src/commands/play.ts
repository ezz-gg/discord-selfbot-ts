import * as Discord from "discord.js-selfbot-v13";
import { Ownerid, Prefix } from "../envs";
import * as Logger from "../utils/logger";
import { player } from '../bot'
/**
 * Replies with some info about the bot host
 * @param {Discord.Client} Client the client
 * @param {Discord.Message} Message the message that contains the command name
 * @param {string[]} args the command args
 * @param {any} options some options
 */

export async function run(Client: Discord.Client, message: Discord.Message, args: any[]) {
    if ( message.author.id === Ownerid || message.author.id === Client.user.id ) {
        const pattern1 = /\d{18}/;
        switch (true) {
            case (args[8] != null):
                var argstitle = args[2] + args[3] + args[4] + args[5] + args[6] + args[7] + args[8];
                break
            case (args[7] != null):
                var argstitle = args[2] + args[3] + args[4] + args[5] + args[6] + args[7];
                break
            case (args[6] != null):
                var argstitle = args[2] + args[3] + args[4] + args[5] + args[6];
                break
            case (args[5] != null):
                var argstitle = args[2] + args[3] + args[4] + args[5];
                break
            case (args[4] != null):
                var argstitle = args[2] + args[3] + args[4];
                break
            case (args[3] != null):
                var argstitle = args[2] + args[3];
                break
            case (args[2] != null):
                var argstitle = args[2];
                break
        }
        if (
            pattern1.test(args[0]) &&
            message.guild.channels.fetch(args[0])
        ) {
            player(message, "play", argstitle, message.channel.id, args[0], message.author, message.guild.id, args[1], 0)

        } else if (!pattern1.test(args[0])) {
            message.reply(
                `エラー\n\`\`\` チャンネルIDが適切ではありません\n ┣${args[0]}\`\`\``
            );
            console.log(`エラー\n チャンネルIDが適切ではありません\n ┣${args[0]}`);
        } else if (!message.guild.channels.cache.get(args[0])) {
            message.reply(
                `エラー\n\`\`\` チャンネルIDが適切ではありません\n ┣${args[0]}\`\`\``
            );
            console.log(`エラー\n チャンネルIDが適切ではありません\n ┣${args[0]}`);
        } else if (!args[0]) {
            message.reply(
                `エラー\n\`\`\` なんか言えや \`\`\``
            );
            console.log(`エラー\n なんか言えや`);
            }
    }
}
const info = {
    name: "play",
    description: "Play a song",
    category: "music",
    args: "[URL of the song, or search by keyword]"
}

export { info };