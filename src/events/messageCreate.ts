import * as Discord from "discord.js-selfbot-v13";
import kanjilist from '../kanji.json';
import * as Logger from "../utils/logger";
import { Prefix, Hardyuyuurl, kyoueioshirasefuckurl, kyoueizatudanfuckurl, rengooshirasefuckurl, rengozatudanfuckurl, kyoueioshirasehimituurl, kyoueizatudanhimituurl, rengooshirasehimituurl, rengozatudanhimituurl } from "../envs";
import { webhooksend, webhookembedsend } from "../utils/webhook";

export default async (Client: Discord.Client, message: Discord.Message) => {
/*
	let messagecontent = message.content || "ㅤ"
	if (message.channel === Client.guilds.cache.get('867341022937612288').channels.cache.find(channel => channel.name === "│中央广报￤notice")) {
		let message_tikan1 = messagecontent.replace(/@everyone/g, '@every1').replace(/@here/g, '@her3');
		let message_tikan2 =  message_tikan1 + message.attachments.map(attachment => attachment.url)
		if (message.embeds[0] == null) {
			webhooksend(kyoueioshirasefuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
			webhooksend(kyoueioshirasehimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
		} else if (message.embeds[0] != null) {
			message.embeds.forEach((embed) => {
				webhookembedsend(kyoueioshirasefuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
				webhookembedsend(kyoueioshirasehimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
			})
		}
	}

	if (message.channel === Client.guilds.cache.get('867341022937612288').channels.cache.find(channel => channel.name === "🚩｜荒ʖ’し𝖢𝖧𝖠𝖳")) {
		let message_tikan1 = messagecontent.replace(/@everyone/g, '@every1').replace(/@here/g, '@her3');
		let message_tikan2 =  message_tikan1 + message.attachments.map(attachment => attachment.url)
		if (message.embeds[0] == null) {
			webhooksend(kyoueizatudanfuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
			webhooksend(kyoueizatudanhimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
		} else if (message.embeds[0] != null) {
			message.embeds.forEach((embed) => {
				webhookembedsend(kyoueizatudanfuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
				webhookembedsend(kyoueizatudanhimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
			})
		}
	}

	if (message.channel === Client.guilds.cache.get('946359933216116736').channels.cache.find(channel => channel.name === "│中央広報￤notice")) {
		let message_tikan1 = messagecontent.replace(/@everyone/g, '@every1').replace(/@here/g, '@her3');
		let message_tikan2 =  message_tikan1 + message.attachments.map(attachment => attachment.url)
		if (message.embeds[0] == null) {
			webhooksend(rengooshirasefuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
			webhooksend(rengooshirasehimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
		} else if (message.embeds[0] != null) {
			message.embeds.forEach((embed) => {
				webhookembedsend(rengooshirasefuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
				webhookembedsend(rengooshirasehimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
			})
		}
	}

	if (message.channel === Client.guilds.cache.get('946359933216116736').channels.cache.find(channel => channel.name === "《🚩荒連雑談》")) {
		let message_tikan1 = messagecontent.replace(/@everyone/g, '@every1').replace(/@here/g, '@her3');
		let message_tikan2 =  message_tikan1 + message.attachments.map(attachment => attachment.url)
		if (message.embeds[0] == null) {
			webhooksend(rengozatudanfuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
			webhooksend(rengozatudanhimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
		} else if (message.embeds[0] != null) {
			message.embeds.forEach((embed) => {
				webhookembedsend(rengozatudanfuckurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
				webhookembedsend(rengozatudanhimituurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
			})
		}
	}

	if (message.channel === Client.guilds.cache.get('621623130124713994').channels.cache.find(channel => channel.name === "【vanilla】mc-chat")) {
		let message_tikan1 = messagecontent.replace(/@everyone/g, '@every1').replace(/@here/g, '@her3');
		let message_tikan2 =  message_tikan1 + message.attachments.map(attachment => attachment.url)
		if (message.embeds[0] == null) {
			webhooksend(Hardyuyuurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }))
		} else if (message.embeds[0] != null) {
			message.embeds.forEach((embed) => {
				webhookembedsend(Hardyuyuurl, message_tikan2, message.member.displayName, message.member.displayAvatarURL({ dynamic: true }), embed)
			})
		}
	}

	let ignore = !message.author.bot && message.author.id !== Client.user.id
	if (ignore) {
		const pattern = /過疎|かそ|カソ|kaso|ｶｿ/;
		if (pattern.test(message.content)) {
			const rand = Math.floor(Math.random() * 100);
			switch (true) {
				case (rand <30):
					var kasomsg = "最近かそったな～";
					message.reply(`${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`);
					break
				case (rand < 55):
					var kasomsg = "過疎ってるね～笑";
					message.reply(`${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`);
					break
				case (rand < 70):
					var kasomsg = "過疎ってねぇよ:face_with_symbols_over_mouth:";
					message.reply(`${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`);
					break
				case (rand < 90):
					var kasomsg = "過疎ってないと思いたい:sob:";
					message.reply(`${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`);
					break
			}
		}
	}
	*/
	const argss: any[] = message.content.slice(Prefix.length).trim().split(" ");
	const args:any [] = argss || undefined
	const cmd: any = argss.shift().toLowerCase();

	const playaliases = /^(play|p|join|再生|流す)$/i;
	const leavealiases = /^(stop|st|leave|dissconnect|di|ストップ|退出|さようなら)$/i;
	const pausealiases = /^(pause|pa|一時停止|一時)$/i;
	const volumealiases = /^(volume|v|音量|ボリューム)$/i;
	const skipaliases = /^(skip|sk|next|スキップ|次|この曲嫌い)$/i;
	const loopaliases = /^(loop|lo|repeat|re|ループ|リピート)$/i;
	const slashaliases = /^(slash|sl|スラッシュ|スラ)$/i;
	const slashpamaliases = /^(slashpam|sls|スラッシュスパム|スラス)$/i;
	const cmdaliases = /^(cmd|c|コマンド|コ)$/i;
	const cmdpamaliases = /^(cmdpam|cs|コマンドスパム|コス)$/i;
	const kaspamaliases = /^(kaspam|ks|カソパム|カスパム)$/i;
	const kaspamezaliases = /^(kaspamez|ksez|カソパムez|カスパムez)$/i;

	if (message.content.startsWith(Prefix)) {
		switch (true) {
			case (playaliases.test(cmd)):
				require(`../commands/play`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (leavealiases.test(cmd)):
				require(`../commands/leave`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (volumealiases.test(cmd)):
				require(`../commands/volume`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (pausealiases.test(cmd)):
				require(`../commands/pause`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (skipaliases.test(cmd)):
				require(`../commands/skip`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (loopaliases.test(cmd)):
				require(`../commands/loop`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (slashaliases.test(cmd)):
				require(`../commands/slash`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (slashpamaliases.test(cmd)):
				require(`../commands/slashpam`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (cmdaliases.test(cmd)):
				require(`../commands/cmd`).run(Client, message, cmd);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (cmdpamaliases.test(cmd)):
				require(`../commands/cmdpam`).run(Client, message, cmd);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (kaspamaliases.test(cmd)):
				require(`../commands/kaspam`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			case (kaspamezaliases.test(cmd)):
				require(`../commands/kaspamez`).run(Client, message, args);
				Logger.log(`CMDRUN：\n				Command:${cmd}\n				Guild:${message.guild.name}\n				Author:${message.author.tag}`);
				break
			default:
				return
		}
	}
}