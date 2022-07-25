import * as Discord from "discord.js-selfbot-v13";
import * as Logger from "../utils/logger";
import { Ownerid, Prefix } from "../envs";
import * as fs from 'fs';
import * as path from "path";
import { player } from "../bot";
import { RateLimiter } from 'discord.js-rate-limiter';

const rateLimiter = new RateLimiter(1, 1000);

export default async (Client: Discord.Client, message: Discord.Message) => {
	
	const argss: any[] = message.content.slice(Prefix.length).trim().split(" ");
	const args:any [] = argss || undefined
	const cmd: any = argss.shift().toLowerCase();

	const blacklistaliases = /^(blacklist|bl|fucklist|fl)$/i;
	const joinaliases = /^(join|connect|start|開始|接続|スタート)$/i;
	const leavealiases = /^(stop|st|leave|dissconnect|di|ストップ|退出|さようなら)$/i;
	const skipaliases = /^(skip|sk|next|スキップ)$/i;


	if (message.content.startsWith(Prefix)) {
		if (message.author.id === Ownerid || JSON.parse(fs.readFileSync(path.join(__dirname,'../whitelist.json'), 'utf8')).hasOwnProperty(message.author.id)) {
			let ratelimited = rateLimiter.take(message.author.id);
			if (!ratelimited) {
				switch (true) {
					case (whitelistaliases.test(cmd)):
						require(`../commands/whitelist`).run(Client, message, args);
						Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
						break
					case (joinaliases.test(cmd)):
						require(`../commands/join`).run(Client, message, args);
						Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
						break
					case (leavealiases.test(cmd)):
						require(`../commands/leave`).run(Client, message, args);
						Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
						break
					case (skipaliases.test(cmd)):
						require(`../commands/skip`).run(Client, message, args);
						Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
						break
					default:
						return
				}
			}
		} else
			return;
	} else if (message.author.id !== Client.user.id && !message.author.bot && message.guild.channels.cache.some(channel => (channel.type === 'GUILD_VOICE' && channel.members.has(Client.user.id))) && !JSON.parse(fs.readFileSync(path.join(__dirname,'../blacklist.json'), 'utf8')).hasOwnProperty(message.author.id)) {
		if (message.attachments.size) {
			var message_content = message.cleanContent.replace(/(https?:\/\/[\x21-\x7e]+)/g, 'URL').replace(/\n| |　/g, '、') + "、添付ファイル";
			if (message_content.length < 200) {
				await player(message, "yomiage", message_content, message.channel.id, message.member.voice.channel.id, message.author, message.guild.id, 100, 0);
			} else
				await player(message, "yomiage", message_content.slice(196) + "以下省略", message.channel.id, message.member.voice.channel.id, message.author, message.guild.id, 100, 0);
		} else if (!message.attachments.size) {
			var message_content = message.cleanContent.replace(/(https?:\/\/[\x21-\x7e]+)/g, 'URL').replace(/\n| |　/g, '、');
			if (message_content.length < 200) {
				await player(message, "yomiage", message_content, message.channel.id, message.member.voice.channel.id, message.author, message.guild.id, 100, 0);
			} else
				await player(message, "yomiage", message_content.slice(196) + "以下省略", message.channel.id, message.member.voice.channel.id, message.author, message.guild.id, 100, 0);
		};
	};
};
