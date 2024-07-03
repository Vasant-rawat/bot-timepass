// const { token }= require('./config.json');
require("dotenv").config();
const {
  Client,
  Events,
  IntentsBitField,
  EmbedBuilder,
  getUserAgentAppendix,
  userMention,
  ActionRow,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandAssertions,
  SlashCommandBuilder,
} = require("discord.js");
const role = [
  {
    id: "1151360597942882346",
    label: "Blue",
  },
  {
    id: "1151361101284515880",
    label: "Aqua Blue",
  },
  {
    id: "1151360708433428550",
    label: "Emerald Green",
  },
  {
    id: "1151360949769490482",
    label: "Goldenrod",
  },
  {
    id: "1151361027787735061",
    label: "Cherry Red",
  },]
  const role2=[
  {
    id: "1151364083266891776",
    label: "Black",
  },
  {
    id: "1151360806244593736",
    label: "Purple Velvet",
  },
  {
    id: "1151361355971039272",
    label: "Magenta",
  },
  {
    id: "1151361266988884008",
    label: "Sunset Orange",
  },
  {
    id: "1151361453094354994",
    label: "Turquoise",
  },]
  const role3=[
  {
    id: "1151361189289410653",
    label: "Sapphire",
  },
  {
    id: "1151361570098663454",
    label: "Lime Green",
  },

  {
    id: "1151361664374014002",
    label: "Ruby Red",
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
client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1211094901379309678");
    if (!channel) return;
    const row = new ActionRowBuilder();
    const row2 = new ActionRowBuilder();
    const row3 = new ActionRowBuilder();
  

    role.forEach((r) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(r.id)
          .setLabel(r.label)
          .setStyle(ButtonStyle.Primary)
      );
    });
        role2.forEach((r) => {
      row2.components.push(
        new ButtonBuilder()
          .setCustomId(r.id)
          .setLabel(r.label)
          .setStyle(ButtonStyle.Primary)
          
      );
    });
        role3.forEach((r) => {
      row3.components.push(
        new ButtonBuilder()
          .setCustomId(r.id)
          .setStyle(ButtonStyle.Primary)
          .setLabel(r.label)
      );
    });

    await channel.send({
      content: "Claim or remove a role  below.",
      components: [row,row2,row3],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});
client.login(process.env.TOKEN);