import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { ENV } from "./env";

const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
];

const main = async () => {
    const rest = new REST({ version: "10" }).setToken(ENV.TOKEN);

    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(ENV.CLIENT_ID), {
            body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on("ready", () => {
        if (client.user == null) throw new Error("client.user is null");
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "ping") {
            await interaction.reply("Pong!");
        }
    });

    client.login(ENV.TOKEN);
};

if (require.main === module) {
    main();
}
