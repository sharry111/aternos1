const express = require('express');
const mineflayer = require('mineflayer');

// Initialize the Express app
const app = express();

// Port binding for Render (uses PORT environment variable)
const PORT = process.env.PORT || 3000;

// Create the Minecraft bot instance
const bot = mineflayer.createBot({
  host: 'DeadBEDSMP.aternos.me', // Replace with your server IP or domain
  port: 42585,                  // Replace with the server port (default: 25565)
  username: 'PuchkiXD',  // Replace with the bot's username
  // password: 'YourPassword',  // Uncomment and provide a password if using online mode
});

// Handle bot spawn event
bot.on('spawn', () => {
  console.log('Bot has connected to the Minecraft server.');
});

// Handle chat messages
bot.on('chat', (username, message) => {
  if (username === bot.username) return; // Ignore messages from itself
  console.log(`Chat message from ${username}: ${message}`);
  bot.chat(`Hello ${username}, you said: "${message}"`);
});

// Handle bot errors
bot.on('error', (err) => {
  console.error('An error occurred:', err);
});

bot.on('end', () => {
  console.log('Bot has disconnected from the server.');
});

// Add a route to check if the bot is running
app.get('/', (req, res) => {
  res.send('Minecraft bot is running!');
});

// Add a route to display bot stats
app.get('/stats', (req, res) => {
  res.json({
    username: bot.username,
    connected: bot.entity ? true : false,
    server: {
      host: bot._client.socket.serverHost,
      port: bot._client.socket.serverPort,
    },
    position: bot.entity ? bot.entity.position : null,
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});
