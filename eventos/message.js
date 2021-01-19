
module.exports = {
    nombre: "message",
    run: async (client, message) => {
        try {
            //prefix
            const prefix = "_";
            //si es bot no responde
            if (message.author.bot) return;
            //comprobamos que sea un comando
            if (message.content.startsWith(prefix)) {
                //ARGS
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                //COMMAND
                const command = args.shift().toLowerCase();
                //busca comando
                let cmd = client.comandos.get(command) || client.comandos.find((c) => c.Alias.includes(command));
                //si existe
                if (cmd) {
                    cmd.run(client, message, args);
                }
            }
        } catch (error) {
            const CanalError = client.channels.cache.get('801163381737259019');
            CanalError.send(`Error en **"messaje"** <@&801163004862529557>\n${error.toString()}\nMensaje: ${message.content}\nCanal: <#${message.channel.id}>\nServidor ${message.guild.name} / ${message.guild.id}`);
            console.log(error);
        }
    }
}