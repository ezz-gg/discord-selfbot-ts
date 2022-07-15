import * as Discord from "discord.js-selfbot-v13";
import { Ownerid } from "../envs";
import * as Logger from "../utils/logger";
import { player, sleep } from '../bot'

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
    if ( message.author.id === Ownerid || message.author.id === Client.user.id ) {
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
    name: "blacklist",
    description: "Blacklist manage commands",
    category: "owner",
    args: "add or delete or list"
}

export { info };