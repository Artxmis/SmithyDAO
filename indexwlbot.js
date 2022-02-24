require('dotenv').config()
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Discord = require('discord.js');
const client = new Discord.Client({fetchAllMembers: true});
let role = "938818949565534228";
let whitelistArray = [];
client.once('ready', async () => {
   console.log("Ready");
   parseCSV();
});
client.on('message',  async message => {
    message.guild.members.cache.forEach(member => {
        let discordid = member.user.id
        let username = member.user.username;
        let hashtag = member.user.discriminator;
        let discordUsername = username+'#'+hashtag;
        // console.log(discordUsername);
        if(whitelistArray.includes(discordUsername))
        {
            console.log(discordUsername + "Role Added");
            member.roles.add(role);
        }
    })
});
client.login(process.env.DISCORD_BOT_TOKEN);

function parseCSV()
{
    fs.createReadStream(path.resolve('wl.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => whitelistArray.push(row.discordID));
}
