const http = require('http');
const mineflayer = require('mineflayer');

// Create the Minecraft bot
const bot = mineflayer.createBot({
  host: "DeadBEDSMP.aternos.me", // Replace with the server IP
  port: 42585,                   // Replace with the Minecraft server port (default: 25565)
  username: "PuchkiXD",   // Replace with your bot's username
  // password: "YourPassword",   // Uncomment if your server requires a password
});

// Bot Event: When the bot joins the server
bot.on('spawn', () => {
  console.log("Bot has connected to the server!");
});

// Bot Event: When the bot receives a message in chat
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  bot.chat(`Hello ${username}, you said: ${message}`);
});

// Bot Event: Error handling
bot.on('error', (err) => {
  console.error("Bot error:", err);
});

// Bot Event: When the bot disconnects from the server
bot.on('end', () => {
  console.log("Bot has disconnected.");
});

// Basic HTTP server to prevent the bot from going idle on Render (required to bind to the port)
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Minecraft bot is running!\n');
});

// Get the port from the environment variable (Render assigns a dynamic port)
const PORT = process.env.PORT || 3000; // Default to 3000 if no port is specified

// Start the HTTP server on the assigned port
server.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});

