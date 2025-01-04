const mineflayer = require('mineflayer');
const http = require('http'); // For creating an HTTP server

// Bot configuration
const botConfig = {
  host: 'DeadBEDSMP.aternos.me', // Replace with your Minecraft server IP or hostname
  port: 42585,       // Replace with your Minecraft server port
  username: 'PuchkiXD', // Bot's Minecraft username
  version: '1.20.1',   // Specify the Minecraft version
};

// HTTP server configuration
const HTTP_PORT = 1000; // Port for the HTTP server

// Create the bot
const bot = mineflayer.createBot(botConfig);

// Handle bot events
bot.on('login', () => {
  console.log(`[Bot] Logged in as ${bot.username}`);
});

bot.on('spawn', () => {
  console.log('[Bot] Spawned in the world.');
  bot.chat('Hello! I am a bot ready to assist you!');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return; // Ignore bot's own messages

  console.log(`[Chat] ${username}: ${message}`);

  if (message === 'register') {
    bot.chat('To register, please visit our website or contact an admin!');
  } else if (message === 'login') {
    bot.chat('You are now logged in!');
  }
});

bot.on('error', (err) => {
  console.error(`[Bot Error] ${err.message}`);
});

bot.on('end', () => {
  console.log('[Bot] Bot has been disconnected.');
});

// Create an HTTP server for external communication
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const command = url.pathname.slice(1); // Extract command from URL path

  if (command === 'status') {
    // Bot status endpoint
    const status = bot.entity ? 'Online' : 'Offline';
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Bot Status: ${status}`);
  } else if (command.startsWith('say')) {
    // Make the bot say a message
    const chatMessage = decodeURIComponent(command.slice(4));
    bot.chat(chatMessage);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Bot said: "${chatMessage}"`);
  } else {
    // Unknown command
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Unknown command. Available commands: /status, /say/<message>');
  }
});

// Start the HTTP server
server.listen(HTTP_PORT, () => {
  console.log(`[HTTP Server] Listening on port ${HTTP_PORT}`);
});
