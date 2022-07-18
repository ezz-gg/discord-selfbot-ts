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
    switch (true) {
        case (message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id)))):
            switch (true) {
                case (args[0] === null):
                    player(message, "skip", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, 0)
                    break
                case (args[0] !== null):
                    player(message, "skip", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, args[0])
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

const info = {
    name: "skip",
    description: "skip",
    category: "music",
    args: "N曲スキップ"
}

export { info };
