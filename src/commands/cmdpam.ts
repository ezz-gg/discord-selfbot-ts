import * as Discord from "discord.js-selfbot-v13";
import { Ownerid } from "../envs";
import * as Logger from "../utils/logger";

/**
 * Replies with some info about the bot host
 * @param {Discord.Client} Client the client
 * @param {Discord.Message} Message the message that contains the command name
 * @param {string[]} args the command args
 * @param {any} options some options
 */
let kaisu = 0;
export async function run(Client: Discord.Client, message: Discord.Message,  args: any[]) {
    if ( message.author.id === Ownerid || message.author.id === Client.user.id) {
        const pattern2 = /\d{18}/;
        kaisu += 1;
        if (kaisu === 2 || 2 < kaisu) {
          while (kaisu !== 0) {
            kaisu -= 1;
          }
          console.log("cmdpamを停止しました");
        } else
            console.log("cmdpamを開始しました");
            if (pattern2.test(args[0])) {
                if (message.attachments.size === 0) {
                    switch (true) {
                        case (args[8] != null):
                            await message.channel.send(args[0] + args[1] + args[2] + args[3] + args[4] + args[5] + args[6] + args[7] + args[8]);
                            break
                        case (args[7] != null):
                            await message.channel.send(args[0] + args[1] + args[2] + args[3] + args[4] + args[5] + args[6] + args[7]);
                            break
                        case (args[6] != null):
                            await message.channel.send(args[0] + args[1] + args[2] + args[3] + args[4] + args[5] + args[6]);
                            break
                        case (args[5] != null):
                            await message.channel.send(args[0] + args[1] + args[2] + args[3] + args[4] + args[5]);
                            break
                        case (args[4] != null):
                            await message.channel.send(args[0] + args[1] + args[2] + args[3] + args[4]);
                            break
                        case (args[3] != null):
                            await message.channel.send(args[0] + args[1] + args[2] + args[3]);
                            break
                        case (args[2] != null):
                            await message.channel.send(args[0] + args[1] + args[2]);
                            break
                        case (args[0] != null):
                            await message.channel.send(args[0] + args[1]);
                            break
                    }
                } else if (message.attachments.size !== 0) {
                    message.reply(
                        `エラー\n\`\`\` 添付ファイルは不可能です \`\`\``
                    );
                    console.log(`エラー\n 添付ファイルは不可能です`);
                }
            }
    }
}
const info = {
    name: "cmdpam",
    description: "Spam command",
    category: "spam",
    args: "none"
}

export { info };