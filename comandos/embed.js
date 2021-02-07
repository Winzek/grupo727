const { MessageEmbed } = require('discord.js');
module.exports = {
    Nombre: "embed",
    Alias: [],
    run: async (client, message, args) => {
        try {
            //eliminamos el mensaje
            message.delete();
            const embed = JSON.parse(args.join(" "))
            message.channel.send(embed);
        } catch (error) {
            if (error.toString().startWith("SyntaxError: Unexpected token")) {
                message.channel.send("Error de sintaxis, revisa bien el mensaje");
            } else {
                const CanalError = client.channels.cache.get('801163381737259019');
                CanalError.send(`Error en **"embed"** <@&801163004862529557>\n${error.toString()}\nMensaje: ${message.content}\nCanal: <#${message.channel.id}>\nServidor ${message.guild.name} / ${message.guild.id}`);
                console.log(error);
            }
        }
    }
}