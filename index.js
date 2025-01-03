const mineflayer = require('mineflayer');

// Configuration
const SERVER_HOST = 'DeadBEDSMP.aternos.me'; // Minecraft server IP
const SERVER_PORT = 42585;      // Minecraft server port
const BOT_USERNAME = 'PuchkiXD'; // Bot's username
const LOGIN_PASSWORD = 'YourSecurePassword'; // Password for login security

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

  // Detect server messages for login or registration
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

// Display Bot Status on Console
setInterval(() => {
  if (bot.entity) {
    console.log(`[Bot Status] Username: ${bot.username}, Position: X=${bot.entity.position.x.toFixed(2)}, Y=${bot.entity.position.y.toFixed(2)}, Z=${bot.entity.position.z.toFixed(2)}`);
  } else {
    console.log('[Bot Status] Bot is not online.');
  }
}, 5000); // Update every 5 seconds
