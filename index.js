// const { token }= require('./config.json');
//require("dotenv").config();
require("dotenv").config({ path: "./.env" });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const jokes = require("one-liner-joke");
const axios = require("axios");
const mongoose = require("mongoose");

/////---------------------FUnctionss

















const genAI = process.env.GEMINI_API_KEY;
const geminiApiUrl =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const {
  Client,
  Events,
  IntentsBitField,
  EmbedBuilder,
  getUserAgentAppendix,
  userMention,
  Guild,
  ActivityType,
  GuildMember,
  AuditLogEvent,
} = require("discord.js");
let emoji = "🔱📿🕉🪘";
let Replies = [
  "bole bsdk kya hai ",
  "kese ho bhai",
  "I am just a bot",
  "theek hai",
  "lol",
  "",
  "You stupid piece of shit. Look what you’ve done now!",
];
let angry = [
  "teri ma ko bhi me yahi bolata",
  "Disturb mat kar teri ma ke saath E-sexs kar luga",
  "i will fuck ur mom in  69 diffrent ways.",
];
let Greetings = [
  "HAR HAR MAHADEV🔱🪘",
  "Radhe Radhe :pray: :pray:",
  "JAI SHREE RAM",
  "Kese ho Bhai",
];

let status = [
  {
    name: "Music",
    type: ActivityType.Listening,
  },
  {
    name: "Youtube",
    type: ActivityType.Watching,
  },
  {
    name: "Procastination",
    type: ActivityType.Custom,
  },
];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online `);
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on(Events.GuildAuditLogEntryCreate, async (auditLog) => {
  // Define your variables.
  const { action, executorId, targetId } = auditLog;

  // Check only for kicked users.
  if (action !== AuditLogEvent.MemberKick) return;

  // Ensure the executor is cached.
  const executor = await client.users.fetch(executorId);

  // Ensure the kicked guild member is cached.
  const kickedUser = await client.users.fetch(targetId);

  // Now you can log the output!
  console.log(`${kickedUser.tag} was kicked by ${executor.tag}.`);
});
//                        MESSAGE REPLY

client.on("messageCreate", async (msg) => {
  // Gemmini AI
  if (msg.content.startsWith("!explain")) {
    const topic = msg.content.slice(8).trim();
    generateGeminiResponse(`Explain ${topic} in simple terms.`, msg);
    async function generateGeminiResponse(prompt, msg) {
        try {
          const response = await axios.post(`${geminiApiUrl}?key=${genAI}`, {
            contents: [{ parts: [{ text: prompt }] }],
          });
          const generatedText = response.data.candidates[0].content.parts[0].text;
          await msg.reply(generatedText);
        } catch (error) {
          console.error("Error generating content:", error);
          await msg.reply(
            "Sorry, I encountered an error while processing your request."
          );
        }
      }
  }
  if (msg.content.startsWith("!kuki")) {
    const query = msg.content.slice(14).trim();

    try {
      const response = await axios.post(`${geminiApiUrl}?key=${genAI}`, {
        contents: [{ parts: [{ text: query }] }],
      });
      const generatedText = response.data.candidates[0].content.parts[0].text;
      await msg.reply(generatedText);

      msg.reply(generatedText);
    } catch (error) {
      console.error(
        "Error generating content:",
        error.response?.data || error.message
      );
      msg.reply("Sorry, I encountered an error while processing your request.");
    }
  }
  if (msg.author.bot) {
    return;
  }

  if (msg.content === "<hello" || msg.content === "jai shree ram") {
    msg.reply("<@" + msg.author.id + ">" + "Radhe Radhe :pray: :pray: ");
    console.log(msg.activity);
  }
  if (msg.content === "kuki help") {
    msg.reply("<@" + msg.author.id + ">" + "Bol b*dk");
  }
  if (
    msg.content === " <@1210877856226218035> hila ke soja " ||
    msg.content === "hilakesoja"
  ) {
    msg.reply("Teri ma hila ke degi number de usaka");
  }
  if (msg.content === " <@1210877856226218035> chutiya") {
    msg.reply("mu me le le mera bsdk");
  } else if (msg.content === "ok" || msg.content === "Ok") {
    msg.reply("Kya laga rakha hai ok ok mc.");
  } else if (msg.content === "Kuki suck my dimk") {
    let random = Math.floor(Math.random() * Replies.length);
    msg.reply(angry[random]);
  } else if (
    msg.content === "kuki" ||
    msg.content === "Kuki" ||
    msg.content === "KuKi"
  ) {
    msg.reply("KUKI");
  }
  if (
    msg.content === "helppe" ||
    msg.content === "Help" ||
    msg.content === "help"
  ) {
    msg.reply("Bol bsdk.");
  }
  if (
    msg.content === "<@1210877856226218035> ayein" ||
    msg.content === "<@1210877856226218035> ayein" ||
    msg.content === "<@1210877856226218035> Ayein"
  ) {
    msg.reply("Baigan");
  }
  if (msg.content === "<@1210877856226218035>") {
    let random = Math.floor(Math.random() * Greetings.length);
    msg.reply(Greetings[random]);
  }

  if (msg.content === "<@1210877856226218035>hello") {
    let random = Math.floor(Math.random() * Replies.length);
    msg.reply(Replies[random]);
  }
  if (
    msg.content === "<@1210877856226218035> hello" ||
    msg.content === "<@1210877856226218035>hello" ||
    msg.content === "<@1210877856226218035> Hello"
  ) {
    msg.reply("ram ram");
  }
});

//          BOT COMMAND /COMMMANDS etc
client.on("interactionCreate", (intraction) => {
  if (!intraction.isChatInputCommand()) return;
  if (intraction.commandName === "about_me") {
    const emb = new EmbedBuilder()
      .setTitle("Bot")
      .setDescription("Kese ho ")
      .setImage(
        "https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      )
      .setThumbnail(
        "https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    intraction.reply({ embeds: [emb] });
  }
  if (intraction.commandName === "joke") {
    intraction.reply(jokes.getRandomJoke().body);
  }
});
client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isButton()) {
      console.log("button was pressed");
      await interaction.deferReply({ ephemeral: true });

      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.editReply({
          content: "I Could not find this role.",
        });
        return;
      }

      const hasRole = interaction.member.roles.cache.has(role.id);

      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      }
      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added.`);
    }
  } catch (error) {
    console.log(error);
  }
});
client.login(process.env.TOKEN);
