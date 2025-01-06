const mineflayer = require('mineflayer');
const http = require('http');

// Configuration
const config = {
  host: 'DeadBEDSMP.aternos.me',          // Minecraft server IP or hostname
  port: 42585,                // Server port
  username: 'PuchkiXD',  // Bot username
  version: '1.20.1',          // Minecraft version
  botPassword: '000000000', // Password for registration/login
  httpPort: 3000,             // Render port binding (HTTP server)
};

let isRegistered = false; // Tracks whether the bot has registered

// Create the bot
function createBot() {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version,
  });

  // Handle bot events
  bot.on('login', () => {
    console.log(`[Bot] Logged in as ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('[Bot] Spawned in the world.');
    authenticateBot(bot);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return; // Ignore the bot's own messages
    console.log(`[Chat] ${username}: ${message}`);
  });

  bot.on('message', (jsonMsg) => {
    console.log('[Server Message]', jsonMsg.toString());
  });

  bot.on('error', (err) => {
    console.error(`[Bot Error] ${err.message}`);
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.error(`[Bot Kicked] Reason: ${reason}, Logged In: ${loggedIn}`);
  });

  bot.on('end', () => {
    console.log('[Bot] Disconnected. Reconnecting...');
    setTimeout(() => createBot(), 5000); // Reconnect after 5 seconds
  });

  return bot;
}

// Authenticate the bot (register or login)
function authenticateBot(bot) {
  console.log('[Bot] Authenticating...');

  setTimeout(() => {
    if (!isRegistered) {
      bot.chat(`/register ${config.botPassword} ${config.botPassword}`);
      console.log('[Bot] Sent register command.');
      isRegistered = true; // Mark as registered after sending the register command
    } else {
      bot.chat(`/login ${config.botPassword}`);
      console.log('[Bot] Sent login command.');
    }
  }, 3000); // Wait 3 seconds to ensure the bot is fully spawned
}

// HTTP server to interact with the bot
function startHttpServer(bot) {
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
      bot.chat(chatMessage); // Correct function call
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
const bot = createBot();
startHttpServer(bot);
