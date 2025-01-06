const mineflayer = require('mineflayer');
const http = require('http');

// Configuration
const config = {
  host: 'DeadBEDSMP.aternos.me',       // Replace with your server's IP or hostname
  port: 42585,             // Server port
  username: 'PuchkiXD', // Bot username (ensure uniqueness)
  version: '1.20.1',       // Server version (set to false for auto-detection)
  botPassword: '000000000', // Bot's password for register/login
  isFirstTime: true,       // Set to true if the bot needs to register
  httpPort: 3000,          // HTTP server port
  autoReconnect: true,     // Automatically reconnect on disconnect
  reconnectDelay: 5000,    // Reconnect delay in milliseconds
};

let bot; // Declare the bot globally

// Function to create and start the bot
function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version,
  });

  bot.on('login', () => console.log(`[Bot] Logged in as ${bot.username}`));

  bot.on('spawn', () => {
    console.log('[Bot] Spawned in the world.');
    handleAuthentication(bot);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return; // Ignore the bot's own messages
    console.log(`[Chat] ${username}: ${message}`);
  });

  bot.on('message', (jsonMsg) => {
    console.log('[Server Message]', jsonMsg.toString());
  });

  bot.on('error', (err) => console.error(`[Bot Error] ${err.message}`));

  bot.on('kicked', (reason, loggedIn) => {
    console.error(`[Bot Kicked] Reason: ${reason}, Logged In: ${loggedIn}`);
  });

  bot.on('end', () => {
    console.log('[Bot] Disconnected.');
    if (config.autoReconnect) {
      console.log(`[Bot] Reconnecting in ${config.reconnectDelay / 1000} seconds...`);
      setTimeout(createBot, config.reconnectDelay);
    }
  });
}

// Handle bot authentication (register/login)
function handleAuthentication(bot) {
  console.log('[Bot] Authenticating...');
  setTimeout(() => {
    } else {
      bot.chat(`/login ${config.botPassword}`);
      console.log('[Bot] Sent login command.');
    }
  }, 3000); // Wait 3 seconds to ensure the bot is fully spawned
}

// Create an HTTP server for interaction
function startHttpServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const command = url.pathname.slice(1); // Extract command from URL path

    if (command === 'status') {
      const status = bot && bot.entity ? 'Online' : 'Offline';
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Bot Status: ${status}`);
    } else if (command.startsWith('say')) {
      const chatMessage = decodeURIComponent(command.slice(4));
      if (bot && bot.entity) {
        bot.chat(chatMessage);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Bot said: "${chatMessage}"`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Bot is not online.');
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Unknown command. Available commands: /status, /say/<message>');
    }
  });

  server.listen(config.httpPort, () => {
    console.log(`[HTTP Server] Listening on port ${config.httpPort}`);
  });
}

// Start the bot and HTTP server
createBot();
startHttpServer();
