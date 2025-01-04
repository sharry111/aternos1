const mineflayer = require('mineflayer');
const http = require('http');

// Bot configuration
const botConfig = {
  host: 'DeadBEDSMP.aternos.me', // Replace with your Minecraft server IP or hostname
  port: 42585,       // Replace with your Minecraft server port
  username: 'PuchkiXD', // Replace with your bot's username
  password: '0000000000', // Optional: Include for premium servers
  version: '1.20.1', // Match your server's Minecraft version (use false for auto-detection)
  auth: 'mojang',    // Use 'microsoft' if the account is linked to Microsoft
};

// HTTP server configuration
const HTTP_PORT = 4000; // Port for the HTTP server

// Create the bot
const bot = mineflayer.createBot(botConfig);

// Handle bot events
bot.on('login', () => {
  console.log(`[Bot] Logged in as ${bot.username}`);
});

bot.on('spawn', () => {
  console.log('[Bot] Spawned in the world.');
  bot.chat('Hello! I am online and ready to assist!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return; // Ignore the bot's own messages
  console.log(`[Chat] ${username}: ${message}`);

  if (message === 'register') {
    bot.chat('To register, please contact an admin or use the provided website!');
  } else if (message === 'login') {
    bot.chat('You are now logged in!');
  }
});

bot.on('error', (err) => {
  console.error(`[Bot Error] ${err.message}`);
});

bot.on('kicked', (reason, loggedIn) => {
  console.error(`[Bot Kicked] Reason: ${reason}, Logged In: ${loggedIn}`);
});

bot.on('end', () => {
  console.log('[Bot] Bot has been disconnected. Attempting to reconnect...');
  reconnect();
});

// Reconnection logic
function reconnect() {
  console.log('[Bot] Reconnecting...');
  setTimeout(() => {
    bot = mineflayer.createBot(botConfig);
  }, 5000); // Attempt reconnect after 5 seconds
}

// Create an HTTP server for render port binding
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const command = url.pathname.slice(1); // Extract command from URL path

  if (command === 'status') {
    const status = bot.entity ? 'Online' : 'Offline';
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Bot Status: ${status}`);
  } else if (command.startsWith('say')) {
    const chatMessage = decodeURIComponent(command.slice(4));
    bot.chat(chatMessage);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Bot said: "${chatMessage}"`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Unknown command. Available commands: /status, /say/<message>');
  }
});

// Start the HTTP server
server.listen(HTTP_PORT, () => {
  console.log(`[HTTP Server] Listening on port ${HTTP_PORT}`);
});
