const prisma =
  require("../config/db");

// FIND OR CREATE CONVERSATION
const findOrCreateConversation =
  async (req, res) => {

    try {

      const {
        user1,
        user2,
      } = req.body;

      // FIND EXISTING CONVERSATION
      let conversation =
        await prisma.conversation.findFirst({
          where: {
            participants: {
              every: {
                id: {
                  in: [
                    user1,
                    user2,
                  ],
                },
              },
            },
          },
        });

      // CREATE NEW
      if (!conversation) {

        conversation =
          await prisma.conversation.create({
            data: {
              participants: {
                connect: [
                  { id: user1 },
                  { id: user2 },
                ],
              },
            },
          });

      }

      res.json(
        conversation
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });

    }
};

module.exports = {
  findOrCreateConversation,
};