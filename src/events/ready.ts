import * as Discord from "discord.js-selfbot-v13";

import * as Logger from "../utils/logger";
import { ClientManager } from "../bot";
export default async (Client: Discord.Client) => {
	Logger.log(`Client is ready and is logged in as ${Client.user.tag}!`);
	Client.user.setStatus('online');
	Client.user.setActivity(`Among Us`)
	ClientManager.init(Client.user.id);
}