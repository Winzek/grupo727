////////// D E C L A R A C I O N E S //////////
require('dotenv').config();
const { Client, MessageEmbed, Collection, MessageAttachment } = require("discord.js");
const client = new Client();
client.comandos = new Collection();
const fs = require("fs");

let comandos = fs.readdirSync('./comandos').filter((f) => f.endsWith(".js"));
////////// C A R G A R   C O M A N D O S //////////
for (var archi of comandos) {
    let comando = require("./comandos/" + archi);
    client.comandos.set(comando.Nombre, comando);
    console.log('\x1b[32m%s\x1b[0m', archi + " fue cargado correctamente");
}

////////// C A R G A R   E V E N T O S //////////
let eventos = fs.readdirSync('./eventos').filter((f) => f.endsWith('.js'));
for(const archi of eventos){
    let evento = require(`./eventos/${archi}`);
    client.on(evento.nombre, evento.run.bind(null, client));
    console.log('\x1b[35m%s\x1b[0m', archi, "fue cargado correctamente");
}

////////// L O G I N //////////
client.login(process.env.TOKEN);
