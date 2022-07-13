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
    if ( message.author.id === Ownerid || message.author.id === Client.user.id) {
        const pattern1 = /all|全部|すべて|全て|リスト|queue|キュー|list/i;
        const pattern2 = /1|one|一つ|一|song|曲|this/i;
        const pattern3 = /off|オフ|しない|no/i;
        switch (true) {
            case (message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id)))):
                switch (true) {
                    case (pattern1.test(args[0])):
                        player(message, "loop_all", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, 0)
                        break
                    case (pattern2.test(args[0])):
                        player(message, "loop_one", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, 0)
                        break
                    case (pattern3.test(args[0])):
                        player(message, "loop_off", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, 0)
                        break
                    default:
                        return;
                }
                break
            case (!message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id)))):
                message.reply(
                    `エラー\n\`\`\` BOTはボイスチャンネルに接続していません\`\`\``
                )
                Logger.log(
                    `エラー：\n			BOTはボイスチャンネルに接続していません`
                )
                break
        }
    }
}
const info = {
    name: "loop",
    description: "Loop Songs",
    category: "music",
    args: "one or all"
}

export { info };