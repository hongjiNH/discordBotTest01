require('dotenv').config();

const logo=process.env.logo

const { EmbedBuilder } = require("discord.js");

module.exports=  {
    data: exampleEmbed = new EmbedBuilder()
    .setColor(0xED4245)
    .setTimestamp()
    .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://'+logo })
}