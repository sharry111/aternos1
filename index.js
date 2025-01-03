const mineflayer = require('mineflayer');
const net = require('net');

// Configuration
const SERVER_HOST = 'DeadBEDSMP.aternos.me'; // Minecraft server IP
const SERVER_PORT = 42585;      // Minecraft server port
const BOT_USERNAME = 'PuchkiXD'; // Bot's username
const LOGIN_PASSWORD = '00000000'; // Password for login security
const RENDER_PORT = 3000;       // Port for render server

// Create Bot
const bot = mineflayer.createBot({
  host: SERVER_HOST,
  port: SERVER_PORT,
  username: BOT_USERNAME,
});

bot.on('login', () => {
  console.log(`[Bot] Successfully logged in as ${bot.username}`);
});

bot.on('spawn', () => {
  console.log(`[Bot] Spawned in the world.`);
});

// Handle Login Security
bot.on('message', (message) => {
  const msg = message.toString();

  if (msg.includes('Please login')) {
    console.log('[Bot] Server requests login.');
    bot.chat(`/login ${LOGIN_PASSWORD}`);
  } else if (msg.includes('Please register')) {
    console.log('[Bot] Server requests registration.');
    bot.chat(`/register ${LOGIN_PASSWORD} ${LOGIN_PASSWORD}`);
  }
});

// Handle Chat Messages
bot.on('chat', (username, message) => {
  if (username === bot.username) return; // Ignore bot's own messages
  console.log(`[Chat] ${username}: ${message}`);
  if (message.toLowerCase() === 'hello bot') {
    bot.chat('Hello! I am here to assist.');
  }
});

// Handle Errors
bot.on('kicked', (reason) => console.log(`[Bot] Kicked: ${reason}`));
bot.on('error', (err) => console.log(`[Bot] Error: ${err}`));

// Render Port Binder
const server = net.createServer((socket) => {
  console.log('[Render Port] Connection established.');

  // Send bot status to the client
  socket.write(`Minecraft Bot Status\n`);
  socket.write(`Username: ${bot.username || 'Not connected'}\n`);

  if (bot.entity) {
    socket.write(
      `Position: X=${bot.entity.position.x.toFixed(2)}, Y=${bot.entity.position.y.toFixed(2)}, Z=${bot.entity.position.z.toFixed(2)}\n`
    );
  } else {
    socket.write('Bot is not online.\n');
  }

  socket.on('data', (data) => {
    const command = data.toString().trim();
    console.log(`[Render Port] Received command: ${command}`);

    if (command === 'status') {
      if (bot.entity) {
        socket.write(
          `Status: Online, Position: X=${bot.entity.position.x.toFixed(2)}, Y=${bot.entity.position.y.toFixed(2)}, Z=${bot.entity.position.z.toFixed(2)}\n`
        );
      } else {
        socket.write('Status: Bot is not online.\n');
      }
    } else {
      socket.write(`Unknown command: ${command}\n`);
    }
  });

  socket.on('close', () => {
    console.log('[Render Port] Connection closed.');
  });
});

server.listen(RENDER_PORT, () => {
  console.log(`[Render Port] Listening on port ${RENDER_PORT}`);
});
