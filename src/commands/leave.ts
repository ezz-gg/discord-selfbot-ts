import * as Discord from "discord.js-selfbot-v13";
import * as Logger from "../utils/logger";
import { player } from '../bot'
import { setTimeout } from 'timers/promises';
/**
 * Replies with some info about the bot host
 * @param {Discord.Client} Client the client
 * @param {Discord.Message} Message the message that contains the command name
 * @param {string[]} args the command args
 * @param {any} options some options
 */
var message_dayo: any = 0
export async function run(Client: Discord.Client, message: Discord.Message, args: any[]) {
    switch (true) {
        case (message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id)))):
            await player(message, "leave", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, 0)
            break
        case (!message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id)))):
            await player(message, "leave_broken", null, message.channel.id, message.guild.me.voice.id, message.author, message.guild.id, null, 0)
            message_dayo = await message.reply(
                `エラー\n\`\`\` BOTはボイスチャンネルに接続していません\`\`\``
            )
            await Logger.log(
                `エラー：\n			BOTはボイスチャンネルに接続していません`
            )
            await setTimeout(5000);
			await message_dayo.delete();
            break
    }
}
const info = {
    name: "leave",
    description: "leave Voice Channel",
    category: "music",
    args: "none"
}

export { info };
