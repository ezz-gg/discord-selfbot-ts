import * as Discord from "discord.js-selfbot-v13";
import * as Logger from "../utils/logger";
import { player } from '../bot'
import { setTimeout } from 'timers/promises';
/**import { setTimeout } from 'timers/promises';
 * Replies with some info about the bot host
 * @param {Discord.Client} Client the client
 * @param {Discord.Message} Message the message that contains the command name
 * @param {string[]} args the command args
 * @param {any} options some options
 */

var message_dayo: any = 0
export async function run(Client: Discord.Client, message: Discord.Message, args: any[]) {
    switch (true) {
        case (message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(message.author.id)))):
            if (!message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id)))) {
                await player(message, "join", "a", message.channel.id, message.member.voice.channel.id, message.author, message.guild.id, 100, 0);
            } else if (message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id)))) {
                message_dayo = await message.reply(
                    `エラー\n\`\`\` すでにボイスチャンネルに接続しています\`\`\``
                );
                await Logger.log(
                    `エラー：\n			すでにボイスチャンネルに接続しています`
                );
                await setTimeout(5000);
                await message_dayo.delete();
                
            };
            break;
        case(!message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(message.author.id)))):
            message_dayo = await message.reply(
                `エラー\n\`\`\` あなたはボイスチャンネルに接続していません\`\`\``
            )
            await Logger.log(
                `エラー：\n			あなたはボイスチャンネルに接続していません`
            )
            await setTimeout(5000);
			await message_dayo.delete();
            break;
        default:
            return;
    }
}