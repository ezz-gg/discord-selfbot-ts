import * as Discord from "discord.js-selfbot-v13";
import { Ownerid } from "../envs";
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
    const pattern1 = /add|追加/i;
    const pattern2 = /delete|remove|削除|反省/i;
    const pattern3 = /list|リスト|一覧/i;
    let reason = args[2] || "理由なし"
    if (message.member.permissions.has("MODERATE_MEMBERS") || message.author.id === Ownerid) {
        switch (true) {
            case (pattern1.test(args[0])):
                player(message, "blacklist_add", reason, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, args[1])
                break
            case (pattern2.test(args[0])):
                player(message, "blacklist_delete", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, args[1])
                break
            case (pattern3.test(args[0])):
                player(message, "blacklist_list", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, 0)
                break
            default:
                return;
        }
    } else
        return;
}
const info = {
    name: "loop",
    description: "Loop Songs",
    category: "music",
    args: "one or all"
}

export { info };