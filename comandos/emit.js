module.exports = {
    Nombre: "emit",
    Alias: [],
    run: async (client, message, args) => {
        try {
            if (!["712063705537445948", "534614025271771158", "327698300998516747"].includes(`${message.author.id}`)) return;
            if (!args[0]) return;
            if (["welcome"].includes(args[0])) {
                client.emit("guildMemberAdd", message.mentions.members.first() || message.member || (await message.guild.fetchMember(message.author)));
            } 
            // else if (["newserver"].includes(args[0])) {
            //     client.emit("guildCreate", client.guilds.cache.get(args[1]) || message.guild);
            // }
        } catch (error) {
            const CanalError = client.channels.cache.get("734497561485901906");
            CanalError.send(`Error en **"emitir"** <@&734599009414676551>\n${error.toString()}\nMensaje: ${message.content}\nCanal: <#${message.channel.id}>\nServidor ${message.guild.name} / ${message.guild.id}`);
            console.log(error);
        }
    }
};
