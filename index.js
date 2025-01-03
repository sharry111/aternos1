const mineflayer = require('mineflayer');
const express = require('express');

// Configuration
const SERVER_HOST = 'DeadBEDSMP.aternos.me'; // Minecraft server IP
const SERVER_PORT = 42585;      // Minecraft server port
const BOT_USERNAME = 'PuchkiXD'; // Bot's username
const LOGIN_PASSWORD = '00000000'; // Password for login security

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

// Web Server for Bot Status
const app = express();
const WEB_PORT = 3000;

app.get('/', (req, res) => {
  if (!bot.entity) {
    res.send('<h1>Bot Status</h1><p>Bot is not online.</p>');
    return;
  }
  res.send(`
    <h1>Minecraft Bot Status</h1>
    <p><b>Username:</b> ${bot.username}</p>
    <p><b>Position:</b> X=${bot.entity.position.x}, Y=${bot.entity.position.y}, Z=${bot.entity.position.z}</p>
  `);
});

app.listen(WEB_PORT, () => {
  console.log(`[Web] Status server running at http://localhost:${WEB_PORT}`);
});
