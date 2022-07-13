import * as path from "path";
import * as Discord from "discord.js-selfbot-v13";
import * as Fs from "fs";

import * as Logger from "./logger";

export async function bind(Client: Discord.Client): Promise<void> {
	return new Promise<void>((resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: any) => void): void => {
		Fs.readdir(path.join(__dirname, "../events/"), (error: Error, files: string[]): void => {
			if (error) {
				Logger.error(error);
				reject(error);
			}

			files = files.filter((file: string): boolean => file.endsWith(".js"));
			for (const file of files) {
				const eventName: string = file.substring(0, file.length - 3);
				try {
					const eventModule: NodeModule = require(Fs.realpathSync(path.join(__dirname, `../events/${file}`)).toString());
					if (file)
					// @ts-ignore
					Client.on(eventName, eventModule.default.bind(null, Client));
					delete require.cache[require.resolve(Fs.realpathSync(path.join(__dirname, `../events/${file}`)).toString())];
				} catch (err) {
					Logger.error(err);
				}
			}
			Logger.log(`Loaded ${files.length} events`);
			resolve();
		});
	});
}
