const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('bans the user you want!')
        
        .addUserOption(option => option.setName('target').setDescription('User you want to ban').setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason as to why user needs to be banned')
                .setRequired(false)),
        permissions: [Permissions.FLAGS.ADMINISTRATOR],

    async execute(interaction) {
        const target = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason');

        if(!target) await interaction.reply('You need to add a target!');

            if(target && !reason) {
                const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`✅ ${target} has been banned`);
                target.ban()
                await interaction.reply({ embeds: [embed]});
            } else {
                const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`✅ ${target} has been banned for ${reason}`);
                target.ban();
                await interaction.reply({ embeds: [embed]});
              
        }
    },
};