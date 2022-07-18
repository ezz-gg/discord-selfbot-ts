import "reflect-metadata";
import * as Discord from "discord.js-selfbot-v13";
import * as Binder from "./utils/eventsbinder";
import * as readline from 'readline';
import { Token, Climode, LavalinkHost, LavalinkPassword } from "./envs";
import express from 'express';
import { Manager } from "erela.js";
import * as Logger from "./utils/logger";
import * as fs from 'fs';
import * as path from "path";

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
		sleep(5000, async function() {
			input()
		});
	}
})();

export const ClientManager = new Manager({
	nodes: [
	  {
		host: LavalinkHost || "0.0.0.0",
		port: 443,
		secure: true,
		password: LavalinkPassword || "password",
	  },
	],
	send(id: any, payload: any) {
	  const guild = Client.guilds.cache.get(id);
	  if (guild) guild.shard.send(payload);
	},
  })
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player: any, track: any) => {
	return;
  })
  .on("queueEnd", async (player: { destroy: () => void; }) => {
    player.destroy();
  });
export async function player(message: Discord.Message, type: string | number, title: any, tcid: any, vcid: any, author: any, guildid: any, volume: number, value: any) {
	var player = ClientManager.create({
		guild: guildid,
		voiceChannel: vcid,
		textChannel: tcid,
	});
	let blacklist = JSON.parse(fs.readFileSync(path.join(__dirname,'./blacklist.json'), 'utf8'))
	let whitelist = JSON.parse(fs.readFileSync(path.join(__dirname,'./whitelist.json'), 'utf8'))
	switch (true) {
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
		case (type === "blacklist_list"):
			await message.reply(`ブラックリスト\n\`\`\`${JSON.stringify(blacklist)}\`\`\``)
			break;
		case (type === 'blacklist_add'):
			blacklist[value] = title;
			message.reply(`ブラックリストに追加\n\`\`\`ユーザー：${value}\n理由：${title}\`\`\``)
			fs.writeFileSync(path.join(__dirname,'./blacklist.json'), JSON.stringify(blacklist));
			break;
		case (type === "blacklist_delete"):
			delete blacklist[value];
			message.reply(`ブラックリストから削除\n\`\`\`ユーザー：${value}\`\`\``)
			fs.writeFileSync(path.join(__dirname,'./blacklist.json'), JSON.stringify(blacklist));
			break;
		case (type === "play"):
			const res = await ClientManager.search(
				title,
				author
			);
			player.connect();
			player.queue.add(res.tracks[0]);
			await message.reply(
				`曲を追加しました\n ┣曲 ${res.tracks[0].title}`
			)
			if (!player.playing && !player.paused && !player.queue.size) {
				await player.play();
				player.setVolume(volume / 10);
				await message.reply(
					`再生を開始しました\n ┣曲 ${res.tracks[0].title}\n ┣音量 ${
					volume
					}%\n ┣チャンネル\n     ┣${message.guild.channels.cache.get(vcid)}`
				);
				console.log(
					`再生開始\n ┣曲 ${res.tracks[0].title}\n ┣音量 ${
					volume
					}%\n ┣チャンネル\n    ┣${message.guild.channels.cache.get(vcid)}`
				)
			}
			break
		case (type === "pause"):
			if (player.paused === true) {
				player.pause(false)
				await message.reply(
					`曲の一時停止を解除しました`
				);
				Logger.log(
					`曲の一時停止を解除しました`
				)
			} else if (player.paused === false) {
				player.pause(true)
				await message.reply(
					`曲を一時停止しました`
				);
				Logger.log(
					`曲を一時停止しました`
				)
			}
			break
		case (type === "skip"):
			if (value === 0) {
				player.stop();
				await message.reply(
					`この曲をスキップしました`
				);
				Logger.log(
					`この曲をスキップしました`
				)
			} else if (type !== 0) {
				await message.reply(
					`${value}曲をスキップしました`
				);
				Logger.log(
					`${value}曲をスキップしました`
				)
				while (value === 0)
					value -= 1
					player.stop();		
			}
			break
		case (type === "volume"):
			player.setVolume(volume / 10)
			await message.reply(
				`ボリュームを${volume}に設定しました`
			);
			Logger.log(
				`ボリュームを${volume}に設定しました`
			)
			break
		case (type === "leave"):
			player.destroy();
			await message.reply(
				`ボイスチャンネルから切断しました`
			);
			await Logger.log(
				`ボイスチャンネルから切断しました`
			)
			break
		case (type === "loop_all"):
			player.setTrackRepeat(false)
			player.setQueueRepeat(true);
			await message.reply(
				`全ての曲をループします`
			);
			await Logger.log(
				`全ての曲をループします`
			)
			break
		case (type === "loop_one"):
			player.setQueueRepeat(false)
			player.setTrackRepeat(true)
			await message.reply(
				`この曲をループします`
			);
			await Logger.log(
				`この曲をループします`
			)
			break
		case (type === "loop_off"):
			player.setQueueRepeat(false)
			player.setTrackRepeat(false)
			await message.reply(
				`ループを無効化しました`
			);
			await Logger.log(
				`ループを無効化しました`
			)
			break
	}
}

export async function sleep(waitSec: number, callback: { (): Promise<void>; (): void; }) {
	setTimeout(callback, waitSec);
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
