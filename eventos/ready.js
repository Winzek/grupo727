const package = require('../package.json');
module.exports = {
    nombre: "ready",
    run: async (client) => {
        try {
            console.log('\x1b[31m%s\x1b[0m', `${client.user.username} ${client.options._tokenType} ${package.version} Listo y Atento!!!`);
        } catch (error) {
            let canal = client.channels.cache.get('801163381737259019');
            canal.send(`Error en **"ready"** <@&801163004862529557>\n${error.toString()}`);
            console.log(error);
        }
    }
}