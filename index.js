const mineflayer = require('mineflayer');
const http = require('http');

// Bot configuration
const botConfig = {
  host: 'DeadBEDSMP.aternos.me',       // Replace with your Minecraft server IP or hostname
  port: 42585,             // Replace with your Minecraft server port
  username: 'PuchkiXD',     // Replace with the bot's username
  password: null,          // No Mojang/Microsoft account password needed for offline servers
  version: '1.20.1',       // Match your server's Minecraft version (use `false` for auto-detection)
};

// Login security configuration
const loginPassword = '000000000000'; // Password for the bot's account on the server

// HTTP server configuration
const HTTP_PORT = 10000; // Port for the HTTP server

// Create the bot
let bot = createBot();

function createBot() {
  const newBot = mineflayer.createBot(botConfig);

  // Handle bot events
  newBot.on('login', () => {
    console.log(`[Bot] Logged in as ${newBot.username}`);
  });

  newBot.on('spawn', () => {
    console.log('[Bot] Spawned in the world.');
    authenticateBot(newBot);
  });

  newBot.on('chat', (username, message) => {
    if (username === newBot.username) return; // Ignore the bot's own messages
    console.log(`[Chat] ${username}: ${message}`);
  });

  newBot.on('error', (err) => {
    console.error(`[Bot Error] ${err.message}`);
  });

  newBot.on('kicked', (reason, loggedIn) => {
    console.error(`[Bot Kicked] Reason: ${reason}, Logged In: ${loggedIn}`);
  });

  newBot.on('end', () => {
    console.log('[Bot] Disconnected. Reconnecting...');
    setTimeout(() => {
      bot = createBot(); // Recreate the bot
    }, 5000); // Reconnect after 5 seconds
  });

  return newBot;
}

// Authenticate the bot with the login plugin
function authenticateBot(bot) {
  console.log('[Bot] Attempting to log in to the server...');
  setTimeout(() => {
    bot.chat(`/login ${loginPassword}`);
    console.log('[Bot] Sent login command.');
  }, 3000); // Wait 3 seconds to ensure the bot is fully spawned
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
