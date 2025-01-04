const mineflayer = require('mineflayer');
const net = require('net'); // For creating a TCP server

// Bot configuration
const botConfig = {
  host: 'DeadBEDSMP.aternos.me', // Replace with your Minecraft server IP or hostname
  port: 42585,       // Replace with your Minecraft server port
  username: 'PuchiXD', // Bot's Minecraft username
  version: '1.20.1',   // Specify the Minecraft version
};

// Render server configuration
const RENDER_PORT = 1000; // Port for the TCP server

// Create the bot
const bot = mineflayer.createBot(botConfig);

// Event: On bot login
bot.on('login', () => {
  console.log(`[Bot] Logged in as ${bot.username}`);
});

// Event: On chat message
bot.on('chat', (username, message) => {
  if (username === bot.username) return; // Ignore bot's own messages

  console.log(`[Chat] ${username}: ${message}`);

  // Commands for the bot
  if (message === 'register') {
    bot.chat('To register, please visit our website or contact an admin!');
  } else if (message === 'login') {
    bot.chat('You are now logged in!');
  }
});

// Event: On bot spawn
bot.on('spawn', () => {
  console.log('[Bot] Spawned in the world.');
  bot.chat('Hello! I am a bot ready to assist you!');
});

// Event: On error
bot.on('error', (err) => {
  console.error(`[Error] ${err.message}`);
});

// Event: On bot disconnect
bot.on('end', () => {
  console.log('[Bot] Bot has been disconnected.');
});

// Create a TCP server for external communication
const server = net.createServer((socket) => {
  console.log('[Render Server] Client connected.');

  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`[Render Server] Received: ${message}`);

    // Handle incoming messages (e.g., commands or requests)
    if (message === 'status') {
      const status = bot.entity ? 'Online' : 'Offline';
      socket.write(`Bot Status: ${status}\n`);
    } else if (message.startsWith('say ')) {
      const chatMessage = message.slice(4);
      bot.chat(chatMessage);
      socket.write(`Bot said: ${chatMessage}\n`);
    } else {
      socket.write('Unknown command.\n');
    }
  });

  socket.on('end', () => {
    console.log('[Render Server] Client disconnected.');
  });

  socket.on('error', (err) => {
    console.error(`[Render Server Error] ${err.message}`);
  });
});

// Start the render server
server.listen(RENDER_PORT, () => {
  console.log(`[Render Server] Listening on port ${RENDER_PORT}`);
});
