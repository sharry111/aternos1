const mineflayer = require('mineflayer')
const http = require('http');

function createBot () {
const bot = mineflayer.createBot({
  host: 'DeadBEDSMP.aternos.me', //ACA VA LA IP DE TU SERVIDOR  // SERVER IP
  username: 'PuchkiXD', // ACA VA EL NOMBRE DEL BOT  // BOT NAME
  port: 42585, // PUERTO DEL SERVIDOR // SERVER PORT
  version: '1.16.5',
})

bot.on('spawn', () => {
  bot.chat('/register contraseña')  
});

//NO TOCAR/// DO NOT TOUCH

bot.on("move", function() {
  //triggers when the bot moves
  //DONT MODIFY THE CODE, THIS CODE WAS CREATED BY JINMORI (YOUTUBE @JIMORIYT). READ THE LICENSE.

  bot.setControlState("jump", true); //continuously jumps
  setTimeout(() => {
    //sets a delay
    bot.setControlState("jump", false); //stops jumping
  }, 1000); //delay time
  //DONT MODIFY THE CODE, THIS CODE WAS CREATED BY JINMORI (YOUTUBE @JIMORIYT). READ THE LICENSE.

  setTimeout(() => {
    //sets a delay
    //DONT MODIFY THE CODE, THIS CODE WAS CREATED BY JINMORI (YOUTUBE @JIMORIYT). READ THE LICENSE.
    bot.setControlState("forward", true); //continuously walks forward
    setTimeout(() => {
      //sets a delay
      bot.setControlState("forward", false); //stops walking forward
    }, 500); //delay time
  }, 1000); //delay time
  //DONT MODIFY THE CODE, THIS CODE WAS CREATED BY JINMORI (YOUTUBE @JIMORIYT). READ THE LICENSE.

  setTimeout(() => {
    //sets a delay
    bot.setControlState("back", true); //continuously walks backwards
    setTimeout(() => {
      //sets a delay
      bot.setControlState("back", false); //stops walking backwards
    }, 500); //delay time
  }, 2000); //delay time

  setTimeout(() => {
    //sets a delay
    //DONT MODIFY THE CODE, THIS CODE WAS CREATED BY JINMORI (YOUTUBE @JIMORIYT). READ THE LICENSE.
    bot.setControlState("right", true); //continuously walks right
    setTimeout(() => {
      //sets a delay
      bot.setControlState("right", false); //stops walking right
    }, 2000); //delay time
  }, 500); //delay time

  setTimeout(() => {
    //sets a delay
    bot.setControlState("left", true); //continuously walks lefz
    setTimeout(() => {
      //sets a delay
      bot.setControlState("left", false); //stops walking left
    }, 2000); //delay time
  }, 500); //delay time
});
  //DONT MODIFY THE CODE, THIS CODE WAS CREATED BY JINMORI (YOUTUBE @JIMORIYT). READ THE LICENSE.

bot.on('kicked', console.log)
bot.on('error', console.log)
bot.on('end', createBot)
}

createBot()

// Basic HTTP server to prevent the bot from going idle on Render (required to bind to the port)
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Minecraft bot is running!\n');
});

// Get the port from the environment variable (Render assigns a dynamic port)
const PORT = process.env.PORT || 3000; // Default to 3000 if no port is specified

// Start the HTTP server on the assigned port
server.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});
