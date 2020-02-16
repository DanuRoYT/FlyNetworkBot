const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

   
  
  message.delete();
  let Saychannel = message.guild.channels.find(`name`, "🌏main-chat");
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  let botmessage = args.join(" ");
  Saychannel.send(botmessage);
}

module.exports.help = {
  name: "say"
}
