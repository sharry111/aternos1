# 🤖 𝙅𝙞𝙣𝘽𝙤𝙩 🤖  
<a href="https://discord.gg/p7GSnkNKXQ">
	<img src="https://img.shields.io/badge/discord-%2324292e.svg?&style=for-the-badge&logo=discord&logoColor=white" alt="Discord"/>
</a>


### Este es un bot que funciona 24/7, creado por JinMori
### https://www.youtube.com/@JinMoriYT
### Recuerda suscribirte!
////////////////////////////////////////////////////////////////////
### This is a bot that works 24/7, created by JinMori
### https://www.youtube.com/@JinMoriYT
### Remember to subscribe!

![Texto alternativo](https://cdn.discordapp.com/attachments/1200061285816082545/1249422615819456602/Miniaturas.png?ex=66673efc&is=6665ed7c&hm=c9d3cc93e7400e7df8a3f9e0a8f61c7453b988b805a9264a8a888383f4804217&)


<br/>

> ### 0: Install English
<details><summary>0:</summary>

# Requirements 📚
1. An account on BotHosting (To upload the code).  
	Register at: https://bot-hosting.net/

2. Download this code.

3. Your minecraft server.  
	Remember to change in the settings: ``online-mode`` and set it to ``false``!  
	You must also have OP, to place the bots in creative mode
   	/gamemode creative Bot1



# Installation ⚙
1. Create your account at BotHosting and get the 10 free coins.

2. Create your bot in node.js.

3. Wait for the bot server to load, and upload the "index.js" and "package.json" files in the files section.

4. Enter `index.js`, you can change the following:
   
`const bot = mineflayer.createBot({
  host: 'ip.aternos.host', // THIS IS THE IP OF YOUR SERVER
  username: 'BOTJIN', // HERE GOES THE BOT NAME
  port: 29595, // SERVER PORT
  version: '1.16.5',
})`
 
 Replace in `ip.aternos` with the IP of your server.
 In `port` you must change the `25565` for the port of your server, if not, it appears in the main menu of the server,
 You can replace the `username`, in this case `BOTJIN` with whatever name you want.

 5. Start the aternos server.
 
 6. Start your bot and wait for it to load.
    
 7. That's all, enjoy!

</details>

<hr/>

> ### 1: Instalación Español
<details><summary>1:</summary>

# Requisitos 📚
1. Una cuenta en BotHosting (Para cargar el código).  
	Registrate en: https://bot-hosting.net/

2. Descargar este código.

3. Tu servidor de minecraft.  
	Recuerda cambiar en la configuración: ``online-mode`` y ponerlo en ``false``!  
	También debes tener OP, para colocar los bots en modo creativo
   	/gamemode creative Bot1



# Instalación ⚙
1. Crea tu cuenta en BotHosting y obtén las 10 monedas gratuitas.

2. Crea tu bot en node.js.

3. Espera a que se cargue el servidor del bot, y sube los archivos "index.js" y "package.json" en la sección files.

4. Entra a `index.js`, podrás cambiar lo siguiente:
   
`const bot = mineflayer.createBot({
  host: 'ip.aternos.host', //ACA VA LA IP DE TU SERVIDOR  // SERVER IP
  username: 'BOTJIN', // ACA VA EL NOMBRE DEL BOT  // BOT NAME
  port: 29595, // PUERTO DEL SERVIDOR // SERVER PORT
  version: '1.16.5',
})`
 
 Reemplaza en `ip.aternos` por la ip de tu servidor.
 En `port` deberás cambiar el `25565` por el puerto de tu servidor, en caso de aternos, aparece en el menú principal del servidor,
 Puedes reemplazar el `username`, en este caso `BOTJIN` por el nombre que desees.

 5. Inicia el servidor de aternos.
 
 6. Inicia tu bot y espera que cargue.
    
 7. Eso es Todo, disfruta!

</details>

<hr/>   

> ### 00: Commands / Comandos
<details><summary>00:</summary>

Puedes cambiar el `/register contraseña`, por cualquier comando que consideres útil, sirve para autologear el bot cada vez que entra al servidor,
puedes cambiarlo por /login una vez que se haya registrado.

You can change the `/register password`, with any command that you consider useful, it serves to autolog the bot every time it enters the server,
you can change it to /login once you have registered.

`bot.on('spawn', () => {
  bot.chat('/register contraseña')  
});`

<hr/>

# Preguntas frecuentes - FAQ ❓

> ### 1: Error `unsupported/unknown protocol version: ###, update minecraft-data`?
<details><summary>A2:</summary>

Este error puede darse porque no todas las versiones son compatibles con mineflayer.
A la fecha 6/24, el bot es compatible con:
`- Supports Minecraft 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19 and 1.20.4`
Si tu bot no entra a la version que quieres, puedes probar usando el plugin ViaVersion, el cual hará que tu bot pueda entrar
en versiones compatibles. Si tu version es antigua, puedes usar ViaVersion Backwards para que funcione. (Testeado en 1.16.5, no requiere
via version ni backwards.)

This error may occur because not all versions are compatible with mineflayer.
As of 6/24, the bot is compatible with:
`- Supports Minecraft 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16, 1.17, 1.18, 1.19 and 1.20.4`
If your bot does not enter the version you want, you can try using the ViaVersion plugin, which will make your bot enter
in compatible versions. If your version is old, you can use ViaVersion Backwards to make it work. (Tested in 1.16.5, does not require
via version or backwards.)

</details>

<hr/>

> ### 2: El bot está baneado? / Banned bot?
<details><summary>A3:</summary>

En caso de aternos, tienen un sistema que banea jugadores que han estado `Afk` durante mucho tiempo.
Puedes desbanearlos manualmente si esto sucede, o cambiar el nombre del bot en la config.

In case others, they have a system that bans players who have been 'Afk' for a long time.
You can unban them manually if this happens, or change the bot name in the config.
</details>

<hr/>

> ### 3: Funciona en bedrock? / BEDROCK MCPE?
<details><summary>A4:</summary>

Sí, funciona perfectamente en Bedrock, pero utilizando GeyserMC, creando un servidor de Java.
Requerirás el plugin GeyserMC y los plugins de ViaVersion.
Si no sabes instalar Geyser, hay muchos tutoriales en youtube!

Yes, it works perfectly in Bedrock, but using GeyserMC, creating a Java server.
You will require the GeyserMC plugin and the ViaVersion plugins.
If you don't know how to install Geyser, there are many tutorials on YouTube!

https://geysermc.org

</details>

<hr/>

> ### 4: Funciona con mods? / Works with mods?
<details><summary>A5:</summary>

A día de hoy, **NO** hay protocolos que funcionen para hacer correr el bot con mods. Ya que es algo externo al minecraft en sí.

It doesn't work with mods sadly.
</details>

<hr/>


# PRECAUCIÓN ⚠
### Este bot está desarrollado solo por entretenimiento y a modo de pruebas.
### No somos responsables de baneos o bugs que puedan generar en hostings como aternos.
**NO RECOMIENDO USARLO EN TU SERVIDOR PRINCIPAL, USALO EN UNO SECUNDARIO SI QUIERES CONFIGURAR COSAS O CONSTRUIR, ETC**
**SI TIENES DUDAS O PREGUNTAS, PUEDES ENTRAR A NUESTRO DISCORD CON EL BOTÓN QUE ESTÁ AL PRINCIPIO DE ESTA PÁGINA**

# CAUTION ⚠
### This bot is developed for entertainment and testing purposes only.
### We are not responsible for bans or bugs that may occur in hostings such as external ones.
**I DO NOT RECOMMEND USING IT ON YOUR MAIN SERVER, USE IT ON A SECONDARY SERVER IF YOU WANT TO CONFIGURE THINGS OR BUILD, ETC**
**IF YOU HAVE DOUBTS OR QUESTIONS, YOU CAN ENTER OUR DISCORD USING THE BUTTON AT THE BEGINNING OF THIS PAGE**
