const defaultEmbed =require('../../share/embed/defaultEmbed');
const file=require('../../share/file')
const commonVariable=require('../../share/index');

const { SlashCommandBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commonVariable.version)
		.setDescription("Version of the current bot "),
	async execute(interaction) {
		defaultEmbed.data
		.setTitle("Version")
		.setFields()
		.setDescription("The current version of the bot is: " + `**${commonVariable.version}**`)

		return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });
	},
};