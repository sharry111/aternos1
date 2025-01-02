const http = require('http');
const mineflayer = require('mineflayer');

// Create the Minecraft bot
const bot = mineflayer.createBot({
  host: "DeadBEDSMP.aternos.me", 
  port: 42585, 
  username: "PuchkiXD", 
  version: "1.16.5" // Specify the server version (optional, if needed)
  // password: "YourPassword",   // Uncomment if your server requires a password
});
// Your password for login/registration
const botPassword = "00000000000000";

// Bot Events
bot.on('spawn', () => {
  console.log("Bot has joined the server!");
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return; // Ignore messages from the bot itself

  console.log(`Chat from ${username}: ${message}`);
  
  // Handle AuthMe messages for login and registration
  if (message.includes("/register") || message.includes("Please register")) {
    console.log("Registering the bot...");
    bot.chat(`/register ${botPassword} ${botPassword}`); // Register command
  } else if (message.includes("/login") || message.includes("Please login")) {
    console.log("Logging in the bot...");
    bot.chat(`/login ${botPassword}`); // Login command
  }
});

// Handle Errors
bot.on('error', (err) => {
  console.error("Bot error:", err);
});

bot.on('end', () => {
  console.log("Bot disconnected. Attempting to reconnect...");
  setTimeout(() => {
    createBot(); // Reconnect the bot after disconnection
  }, 5000); // Retry after 5 seconds
});

// Bot Event: When the bot joins the server
bot.on('spawn', () => {
  console.log("Bot has connected to the server!");
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

