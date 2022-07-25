import "reflect-metadata";
import * as Discord from "discord.js-selfbot-v13";
import * as Binder from "./utils/eventsbinder";
import * as readline from 'readline';
import { Token, Climode, LavalinkHost, LavalinkPassword } from "./envs";
import express from 'express';
import { Manager } from "erela.js";
import * as Logger from "./utils/logger";
import * as fse from 'fs-extra';
import * as path from "path";
import { setTimeout } from 'timers/promises';
var text_channel: any = 0
var message_dayo: any = undefined

const app = express()
const Client: Discord.Client = new Discord.Client({
	checkUpdate: false,
});

Client.on('error', Logger.error);

/* あまり使わない方がいいと思うなり
タイムアウトの対応できてないから使います*/
process.on('uncaughtException', function(err) {Logger.error(err)});


let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  });

(async () => {
	await Binder.bind(Client);
	await Client.login(Token);
	app.listen(3000, '0.0.0.0', () => {
	  });
	app.get('/', (req: any, res: { json: (arg0: { server: string; }) => void; end: () => void; })=> {
		res.json({ "server": "running"});
		res.end();
	})
	if (Climode) {
		await setTimeout(5000);
		await input();
	};
})();

export const ClientManager = new Manager({
	nodes: [
	  {
		host: LavalinkHost || "0.0.0.0",
		port: 2333,
		password: LavalinkPassword || "ppassword",
	  },
	],
	send(id: any, payload: any) {
	  const guild = Client.guilds.cache.get(id);
	  if (guild) guild.shard.send(payload);
	},
  })
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`));

export async function player(message: Discord.Message, type: string | number, title: any, tcid: any, vcid: any, author: any, guildid: any, volume: number, value: any) {
	var player = ClientManager.create({
		guild: guildid,
		voiceChannel: vcid,
		textChannel: tcid,
	});
	let whitelist = JSON.parse(fs.readFileSync(path.join(__dirname,'./whitelist.json'), 'utf8'))
	switch (true) {
		case (type === "yomiage"):
			if (text_channel === message.channel.id) {
				var res = await ClientManager.search(
					`https://gttsus.vercel.app/?text=${title}`,
					author
				);
				player.setVolume(25);
				player.queue.add(res.tracks[0]);
				if (!player.playing && !player.paused && !player.queue.size) {
					await player.play();
				};
			};
			break;
		case (type === "whitelist_list"):
			await message.reply(`オーナーリスト\n\`\`\`${JSON.stringify(whitelist)}\`\`\``)
			break;
		case (type === 'whitelist_add'):
			whitelist[value] = title;
			message.reply(`オーナーリストに追加\n\`\`\`ユーザー：${value}\n概要：${title}\`\`\``)
			fs.writeFileSync(path.join(__dirname,'./whitelist.json'), JSON.stringify(whitelist));
			break;
		case (type === "whitelist_delete"):
			delete whitelist[value];
			message.reply(`オーナーリストから削除\n\`\`\`ユーザー：${value}\`\`\``)
			fs.writeFileSync(path.join(__dirname,'./whitelist.json'), JSON.stringify(whitelist));
			break;
		case (type === "join"):
			text_channel = tcid;
			message_dayo = await message.reply(`読み上げを開始しました\n┣チャンネル\n ┣${message.guild.channels.cache.get(vcid)}`);
			var res = await ClientManager.search(
				"https://gttsus.vercel.app/?text=接続しました",
				author
			);
			player.connect();
			player.setVolume(25);
			player.queue.add(res.tracks[0]);
			if (!player.playing && !player.paused && !player.queue.size) {
				await player.play();
			};
			await setTimeout(5000);
			await message_dayo.delete();
			break;
		case (type === "skip"):
			if (value == 1 && value == 0 && value == null) {
				player.stop();
				Logger.log(
					`このメッセージをスキップしました`
				);
			} else
				Logger.log(
					`${value}メッセージをスキップしました`
				);
				while (value >= 0) {
					value -= 1;
					player.stop();
					if (value === 0) break;
				};
				break;
		case (type === "leave"):
			player.destroy();
			text_channel = 0;
			message_dayo = await message.reply(
				`ボイスチャンネルから切断しました`
			);
			await Logger.log(
				`ボイスチャンネルから切断しました`
			);
			await setTimeout(5000);
			await message_dayo.delete();
			break;
		case (type === "leave_broken"):
			player.destroy();
			break;
	}
}

async function input() {
	let whileloop = 0
	while (whileloop === 0)
		whileloop += 1
		rl.question('入力：コマンド >', (cmd) => {
		switch (cmd) {
			case 'say':
				let say = 0;
				say += 1;
				while (say === 1) {
					say += 1;
					rl.question('入力：Say：チャンネルID (ID/n) >', async (say1) => {
						switch (say1) {
							case "n":
							case "N":
							case "c":
							case "C":
							case "取り消し":
							case "送らない":
							case "キャンセル":
							case "cancel":
								console.log("取り消し：Say：送信をキャンセルしました");
								await input();
								break;
							default:
								const pattern1 = /\d{18}/;
								if (pattern1.test(say1)) {
									say += 8;
									while (say === 10) {
										say += 1;
										rl.question('入力：Say：メッセージ内容 >', (say2) => {
											rl.question(`確認：Say：\n     チャンネルID：${say1}\n     送信内容：\n${say2}\n送信しますか? (Y/n) >`, async (say3) => {
												switch (say3) {
													case "y":
													case "Y":
													case "はい":
													case "うん":
													case "いいよ":
														say -= 11;
														// @ts-ignore
														await Client.channels.fetch(say1).then((c: { send: (arg0: string) => any; }) => c.send(say2));
														console.log(`完了：Say：\n     チャンネルID：${say1}\n     送信内容：\n${say2}`);
														await input();
														break;
													case "n":
													case "N":
													case "いいえ":
													case "だめ":
													case "いやだ":
													case "c":
													case "C":
													case "取り消し":
													case "送らない":
													case "キャンセル":
													case "cancel":
														console.log("取り消し：Say：の送信をキャンセルしました");
														say -= 11;
														await input();
														break;
												}
											});
										});
									}
								} else if (!pattern1.test(say1)) {
									console.log("エラー：Say：例外が発生したのでキャンセルしました");
									await input();
								}
						}
					});
				}
		}
	}
)}
