// const admin = require('firebase-admin');
// const db = admin.firestore();
const Zeew = require("zeew");
// const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');
// const client = require('../bot');
module.exports = {
    nombre: "guildMemberAdd",
    run: async (client, member) => {
        try {
            // const snapshot = await db.collection(`servers/${member.guild.id}/channels`).doc("welcome").get();
            // if (snapshot.exists) {
                //rol
                // if (snapshot.data().rol) {
                //     const rol = await member.guild.roles.cache.get(snapshot.data().rol);
                //     member.roles.add(rol.id).catch(error => console.log(error));
                // }
                //bienvenida
                const Canal = member.guild.channels.cache.get("806619119541157920");
                if (!Canal) return;
                let wel = new Zeew.Bienvenida()
                    .token(process.env.TOKEN_ZEEW)
                    .estilo("classic")
                    .avatar(member.user.displayAvatarURL({format: "png"}))
                    .fondo("")
                    .colorTit("#00B2FF")
                    .titulo(`Welcome ${member.user.username}`)
                    .colorDesc("#fff")
                    .descripcion("Diviertete al máximo");
                let img = await Zeew.WelcomeZeew(wel);
                let attachment = new MessageAttachment(img, `welcome-${member.user.username}.png`);
                Canal.send({
                    files:[
                        attachment
                    ],
                    content: `Welcome <@${member.user.id}> a Grupo 727 México\nEres el miembro #${member.guild.memberCount}, para obtener más información comunicate con el staff`
                });
                // Canal.send("Texto");
            // }
            // const snap = await db.collection(`servers/${member.guild.id}/channels`).doc("membercount").get();
            // if (snap.data()) {
            //     const canalMemberCount = member.guild.channels.cache.get(snap.data().channel);
            //     if (canalMemberCount) {
            //         canalMemberCount.setName(`Miembros: ${member.guild.memberCount}`);
            //     }
            // }
        } catch (error) {
            console.log(error);
            let Canal = client.channels.cache.get("734497561485901906");
            Canal.send(`Error en **"guildMemberAdd"** <@&734599009414676551>\n${error.toString()}\nEn ${member.guild.name} ${member.guild.id}`);
        }
    }
}