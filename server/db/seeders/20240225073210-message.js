"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "messages",
      [
        {
          userId: 1,
          conversationId: 1,
          text: "hello mary how are you!",
          sent_timestamp: new Date(),
        },
        {
          userId: 2,
          conversationId: 1,
          text: "hey john im good thanks, you?",
          sent_timestamp: new Date(),
        },
        {
          userId: 1,
          conversationId: 1,
          text: "good to hear! what have you been up to recently?",
          sent_timestamp: new Date(),
        },
        {
          userId: 2,
          conversationId: 1,
          text: "oh nothing much just chilling",
          sent_timestamp: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("messages", null, {});
  },
};
