module.exports = {
    Nombre: "ping",
    Alias: [],
    run: async (client, message, args) => {
        message.channel.send("pong!");
    }
}
//El nombre del archivo debe ser el mismo nombre del comando
