import * as Discord from "discord.js-selfbot-v13";
import { Ownerid } from "../envs";
import kanjilist from '../kanji.json';
import * as Logger from "../utils/logger";

/**
 * Replies with some info about the bot host
 * @param {Discord.Client} Client the client
 * @param {Discord.Message} Message the message that contains the command name
 * @param {string[]} args the command args
 * @param {any} options some options
 */
let kaisu = 0;
export async function run(Client: Discord.Client, message: Discord.Message,  args: any[]) {
  kaisu += 1;
  if (kaisu === 2 || 2 < kaisu) {
    while (kaisu !== 0) {
      kaisu -= 1;
    }
    console.log("kaspamEZを停止しました");
  } else console.log("kaspamEZを開始しました");
  while (kaisu === 1) {
    let rand = Math.floor(Math.random() * 100);
    if (rand < 30) {
      let kasomsg = "最近かそったな～";
      await message.channel.send(
        `${kanjilist[Math.floor(Math.random()*kanjilist.length)]}@everyone${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`
      );
    } else if (rand < 50) {
      let kasomsg = "過疎:sob:";
      await message.channel.send(
        `${kanjilist[Math.floor(Math.random()*kanjilist.length)]}@everyone${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`
      );
    } else if (rand < 70) {
      let kasomsg = "過疎ってるね～笑";
      await message.channel.send(
        `${kanjilist[Math.floor(Math.random()*kanjilist.length)]}@everyone${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`
      );
    } else if (rand < 90) {
      let kasomsg = "過疎ってねぇよ:face_with_symbols_over_mouth:";
      await message.channel.send(
        `${kanjilist[Math.floor(Math.random()*kanjilist.length)]}@everyone${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`
      );
    } else if (rand < 100) {
      let kasomsg = "過疎ってないと思いたい:sob:";
      await message.channel.send(
        `${kanjilist[Math.floor(Math.random()*kanjilist.length)]}@everyone${kanjilist[Math.floor(Math.random()*kanjilist.length)]}${kasomsg}${kanjilist[Math.floor(Math.random()*kanjilist.length)]}`
      );
    }
  }
}


const info = {
    name: "kaspamez",
    description: "Spam KASO :yes: mention",
    category: "spam",
    args: "none"
}

export { info };