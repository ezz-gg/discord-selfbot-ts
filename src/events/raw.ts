import * as Discord from "discord.js-selfbot-v13";

import * as Logger from "../utils/logger";
import { ClientManager } from "../bot";
export default async (Client: Discord.Client, d) => {
    await ClientManager.updateVoiceState(d);
}