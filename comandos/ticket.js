const { MessageAttachment, MessageEmbed } = require('discord.js');
module.exports = {
    Nombre: "ticket",
    Alias: [],
    run: async (client, message, args) => {
        try {
            if(!args[0]) return;
            if (args[0].toLowerCase() == "open") {
                const on = await client.tickets.get(message.author.id);
                if (on) return message.reply("Ya has abierto un ticket, espera respuesta");
                client.tickets.set(message.author.id, true);
                const tm = await message.guild.channels.cache.get("805704637583065098");
                let embed = new MessageEmbed()
                    .setTitle("Tiket Abierto")
                    .addField("Usuario", message.member.nickname ?? message.author.username)
                    .addField("Abierto Por", args[1]? args.slice(1).join(" ") : "No especificada")
                    .addField("ID", message.author.id)
                    .setTimestamp();
                tm.send(embed);
            } else if (args[0].toLowerCase() == "acept") {
                if (!message.member.roles.cache.has("783100297181790268")/*STAF*/) return;
                if (!args[1]) return message.channel.send("Debes especificar un ID");
                const userTicket = await message.guild.members.cache.get(args[1]);
                if (!userTicket) return message.channel.send("Usuario no encontrado");
                const canal = await message.guild.channels.create(`${userTicket.nickname ?? userTicket.username}`, {
                    type: 'text',
                    topic: userTicket.id,
                    parent: "805698548389511198",
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: [
                                'SEND_MESSAGES',
                                "READ_MESSAGE_HISTORY"
                                // "READ_MESSAGES"
                            ]
                        },
                        {
                            id: userTicket.id,
                            allow: [
                                'SEND_MESSAGES',
                                // "READ_MESSAGES"
                            ]
                        }
                    ]
                });
            } else if (args[0].toLowerCase() == "close") {
                if (!message.member.roles.cache.has("783100297181790268")/*STAF*/) return;
                if (!args[1]) return message.channel.send("Debes especificar un ID");
                const userTicket = await message.guild.members.cache.get(args[1]);
                if (!userTicket) return message.channel.send("Usuario no encontrado");
                const tm = await message.guild.channels.cache.get("805704637583065098");
                let embed = new MessageEmbed()
                    .setTitle("Tiket Cerrado")
                    .addField("Usuario", userTicket.nickname ?? userTicket.username)
                    .addField("Cerrado Por", args[1]? args.slice(1).join(" ") : "No especificada")
                    .addField("ID", message.author.id)
                    .setTimestamp();
                message.guild.channels.cache.map(ch => {
                    if (ch.topic == userTicket.id) ch.delete();
                });
                tm.send(embed);
                client.tickets.set(message.author.id, false);
            } else if (args[0].toLowerCase() == "rechazed") {
                if (!message.member.roles.cache.has("783100297181790268")/*STAF*/) return;
                if (!args[1]) return message.channel.send("Debes especificar un ID");
                const userTicket = await message.users.cache.get(args[1]);
                if (!userTicket) return message.channel.send("Usuario no encontrado");
                userTicket.sendMessage(`Ticket abierto en **Team 727** rechazado\nRazón: ${args[1]? args.slice(1).join(" ") : "No especificada"}`);
                client.tickets.set(message.author.id, false);
            }
        } catch (error) {
            const CanalError = client.channels.cache.get('801163381737259019');
            CanalError.send(`Error en **"ticket"** <@&801163004862529557>\n${error.toString()}\nMensaje: ${message.content}\nCanal: <#${message.channel.id}>\nServidor ${message.guild.name} / ${message.guild.id}`);
            console.log(error);
        }
    }
}
