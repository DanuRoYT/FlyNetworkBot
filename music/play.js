const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");

var servers = {};

module.exports.run = async (bot, message, args) => {
	
	function play(connection, message){
		var server = servers[message.guild.id];
		
		server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));
		
		server.queue.shift();
		
		server.dispatcher.on("end", function(){
			if(server.queue[0]){
				play(connection, message);
			}else{
				connection.disconnect();
			}
		});
	}
	
	if(!args[0]){
		message.channel.send("Please put a link!");
		return;
 }
 
 if(!message.member.voiceChannel){
 	 message.channel.send("Please join in a voice channel!");
 	 return; 
 }
 
 if(!servers[message.guild.id]) servers[message.guild.id] = {
 	 queue: []
 }
 
 var server = servers[message.guild.id];
 
 server.queue.push(args[1]);
 
 if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
 	 play(connection, message);
 });
  
}

module.exports.help = {
    name: "play"
}