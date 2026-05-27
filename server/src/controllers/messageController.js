const prisma =
require("../config/db");

const sendMessage =
async (req, res) => {

  try {

    const {
      text,
      senderId,
      conversationId,
    } = req.body;

    const message =
      await prisma.message.create({
        data: {
          text,
          senderId,
          conversationId,
        },
      });

    res.status(201).json(
      message
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Server error",
    });

  }
};

const getMessages =
  async (req, res) => {

    try {

      const {
        conversationId,
      } = req.params;

      const messages =
        await prisma.message.findMany({
          where: {
            conversationId,
          },

          orderBy: {
            createdAt: "asc",
          },
        });

      res.json(messages);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });

    }
};

module.exports = {
sendMessage,
getMessages,
};