import * as Discord from "discord.js-selfbot-v13";
import { player, voice_channel } from '../bot'
import { Only_guild } from "../envs";
import * as fs from 'fs';
import * as path from "path";

export default async (Client: Discord.Client, oldState, newState) => {
    if (oldState.guild.id === Only_guild && oldState.user.id !== Client.user.id && newState.user.id !== Client.user.id) {
        if (oldState.channelId === voice_channel || newState.channelId === voice_channel) {
            switch (true) {
                case (oldState.channelId == null && newState.channelId != null):
                    player(null, "vcmember_join", oldState.member.user.username, null, oldState.channelId, oldState.author, oldState.guild.id, 0, 0);
                    break;
                case (oldState.channelId != null && newState.channelId == null):
                    player(null, "vcmember_leave", newState.member.user.username, null, newState.channelId, newState.author, newState.guild.id, 0, 0);
                    break;
                case (oldState.channelId != null && newState.channelId != null && newState.channelId != voice_channel):
                    player(null, "vcmember_tomove", oldState.member.username, null, oldState.channelId, oldState.author, oldState.guild.id, 0, 0);
                    break;
            };
        };
    };
};
