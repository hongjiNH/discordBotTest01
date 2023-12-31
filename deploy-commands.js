
require('dotenv').config()
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const token = process.env.token;
const clientId = process.env.clientId;

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Grab all the command/clash of clan folders from the commands directory you created earlier
const clashOfClanPath = path.join(__dirname, 'commands/clashOfClan');
const clashOfClanCommandFolders = fs.readdirSync(clashOfClanPath);

// // Grab all the command/valorent folders from the commands directory you created earlier
// const valorentPath = path.join(__dirname, 'commands/valorent');
// const valorentCommandFolders = fs.readdirSync(valorentPath);

module.exports = (guildId,client) => {
	for (const folder of commandFolders) {
		// Grab all the command files from the commands directory you created earlier
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	for (const folder of clashOfClanCommandFolders) {
		// Grab all the command/Clash Of Clan files from the commands directory you created earlier
		const commandsPath = path.join(clashOfClanPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	// for (const folder of valorentCommandFolders) {
	// 	// Grab all the command/valorent files from the commands directory you created earlier
	// 	const commandsPath = path.join(valorentPath, folder);
	// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// 	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	// 	for (const file of commandFiles) {
	// 		const filePath = path.join(commandsPath, file);
	// 		const command = require(filePath);
	// 		if ('data' in command && 'execute' in command) {
	// 			commands.push(command.data.toJSON());
	// 		} else {
	// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	// 		}
	// 	}
	// }


	

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(token);

	// and deploy your commands!
	(async () => {
		try {

			// let totalServer = 0;
			// for (let i = 0; i < guildId.length; i++) {
			// 	totalServer++;

			// 	console.log(`Started refreshing ${commands.length} application (/) commands for guild ${guildId[i]}`);

			// 	const commands1 = await client.guilds.cache.get(guildId[i]).commands.fetch();
			// 	if(commands1.length!==0){
			// 	 // Delete all the existing guild commands
			// 		await Promise.all(commands1.map(command => command.delete()));
			// 	}
		
			// }
			
			console.log(`Started refreshing ${commands.length} application (/) commands globally.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);

			console.log(`Successfully reloaded ${data.length} application (/) commands globally. `);
			console.log(`---------------------------------------`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
}
