import { MessageEmbed, WebhookClient } from "discord.js-selfbot-v13";

export function webhooksend(webhookurl, text, username, avatarurl) {
    let webhookClient = new WebhookClient({ url: webhookurl })
    webhookClient.send({
        content: text,
        username: username,
        avatarURL: avatarurl,
        allowedMentions: {
            parse: []
        }
    })
}

export function webhookembedsend(webhookurl, text, username, avatarurl, embed) {
    let webhookClient = new WebhookClient({ url: webhookurl })
    webhookClient.send({
        content: text,
        username: username,
        avatarURL: avatarurl,
        embeds: [new MessageEmbed(embed)],
        allowedMentions: {
            parse: []
        }
    })
}