require('dotenv').config();
const{REST,Routes} =require('discord.js');

const commands =[
    {name:'about',
    description:'About me',
    },
    {
        name:'joke',
        description:'one-line-jokes'
    },

]
const rest = new REST({version:'10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Registring Commands...`);
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID,process.env.GUILD_ID),
            { body:commands }
        );
        console.log(`Slash command was Register Successfully`);
    } catch (error) {
        console.log(`THERE WAS AN ERROR: ${error}`);
    }
})();
