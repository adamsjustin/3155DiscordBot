const Discord = require('discord.js');
const bot = new Discord.Client();
var auth = require('./auth.json');
var token = auth.token;
bot.login(token);
var logger = require('winston');
var auth = require('./auth.json');
var x = true;
var repeat = false;

//require api's we use for commands.
const numWords = require('num-words')
const figlet = require('figlet')

//Set up our translation api engine with its api key (from configs for best practice reasons). We are using Yandex.
const trans = require('translate');
const config = require("./config.json")
trans.engine = "yandex";
trans.key = config.key;

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
var items = ["||:grey_question:||","||:grey_question:||","||:grey_question:||","||:grey_question:||","||:grey_question:||","||:grey_question:||","||:grey_question:||","||:grey_question:||","||:grey_question:||"];
do{
bot.on('message', msg => {
  if (msg.content === 'tictactoe') {
    msg.reply('Welcome to Tic Tac Toe');
    msg.channel.send("||:grey_question:||    ||:grey_question:||    ||:grey_question:||    ||:grey_question:||")
    for(var i = 0; i<7; i+=3){
      msg.channel.send("||:grey_question:||   "+items[i] + items[i+1] + items[i+2]+"   ||:grey_question:||");
    }
    msg.channel.send("||:grey_question:||    ||:grey_question:||    ||:grey_question:||    ||:grey_question:||")
  
    msg.channel.send('What is your move?');
  
  } else if(msg.content === 'What is your move?'){
       msg.react('1️⃣')
			.then(() => msg.react('2️⃣'))
      .then(() => msg.react('3️⃣'))
      .then(() => msg.react('4️⃣'))
      .then(() => msg.react('5️⃣'))
      .then(() => msg.react('6️⃣'))
      .then(() => msg.react('7️⃣'))
      .then(() => msg.react('8️⃣'))
      .then(() => msg.react('9️⃣'))
      .catch(() => console.error('One of the emojis failed to react.'));

      const filter = (reaction, user) => {
        return ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'].includes(reaction.emoji.name) && user.id !== msg.author.id;
      };
      
      msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();



     if(reaction.emoji.name === '1️⃣'){
      if(x === true){
        items[0] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[0] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } else if(reaction.emoji.name === '2️⃣'){
      if(x === true){
        items[1] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[1] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } 
    else if(reaction.emoji.name === '3️⃣'){
      if(x === true){
        items[2] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[2] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } 
    else if(reaction.emoji.name === '4️⃣'){
      if(x === true){
        items[3] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[3] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } 
    else if(reaction.emoji.name === '5️⃣'){
      if(x === true){
        items[4] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[4] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } 
    else if(reaction.emoji.name === '6️⃣'){
      if(x === true){
        items[5] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[5] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } 
    else if(reaction.emoji.name === '7️⃣'){
      if(x === true){
        items[6] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[6] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } 
    else if(reaction.emoji.name === '8️⃣'){
      if(x === true){
        items[7] = ":x:";
        msg.channel.send('you placed an X.');
        x = false;
        } else {
          items[7] = ":o:";
          msg.channel.send('you placed an O.');
          x = true;
        }
        repeat = true;
    } 
    if (reaction.emoji.name === '9️⃣') {
      if(x === true){
      items[8] = ":x:";
      msg.channel.send('you placed an X.');
      x = false;
      } else {
        items[8] = ":o:";
        msg.channel.send('you placed an O.');
        x = true;
      }
      repeat = true;
    }

    else {
      //msg.channel.send('you did not pick a valid option, please pick again.');
      repeat = true;
		}
	})
   
  }
  else{
    switchMe(msg);
  }

  if(repeat === true) {
    repeat = false;
    msg.channel.send("||:grey_question:||    ||:grey_question:||    ||:grey_question:||    ||:grey_question:||")
    for(var i = 0; i<7; i+=3){
      msg.channel.send("||:grey_question:||   "+items[i] + items[i+1] + items[i+2]+"   ||:grey_question:||");
    }
    msg.channel.send("||:grey_question:||    ||:grey_question:||    ||:grey_question:||    ||:grey_question:||")
    msg.channel.send('What is your move?');
  }

  

});} 
while(repeat ===true);


async function translate(args, msg){
  fromCase = args[1];
  toCase = args[2];
  args = args.splice(3);
  myString = args.join(" ");
  try{
      var myText = await trans(myString, { from: fromCase, to: toCase });
      msg.channel.send(myText);
  }
  catch{
    msg.channel.send("The to or from language was not recognized.");
  }
}

function switchMe(msg) {
  if(msg.content.substring(0, 1) == '!'){
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];
    

        switch(cmd) {
            // !translate
            case 'translate':
                translate(args, msg);
            break;
            // !bubblewrap
            case 'bubblewrap':
              msg.channel.send("||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop||");
            break;
            // !important
            case 'important':
                var myMessage = [];
                args.splice(1).forEach(element => {
                    for(i = 0; i < element.length; i++){
                        if(isNaN(element.charAt(i))) {
                            myMessage.push(":regional_indicator_" + element.charAt(i).toLowerCase() + ": ");
                        }else{
                            myMessage.push(":" + numWords(parseInt(element.charAt(i))).toLowerCase() + ": ");
                        }
                    }
                    
                });
                msg.channel.send(myMessage.join(" "));
            break;
            // !ascii
            case 'ascii':
              var myMessage = args.splice(1).join(" ");
                const asciiText = figlet.textSync(myMessage, {
                  font: 'Big',
                  horizontalLayout: 'universal smushing',
                  verticalLayout: 'universal smushing'
                })
                msg.channel.send(`\`\`\`${asciiText}\`\`\``);
            break;
         }
  }
}