const prisma =
  require("../config/db");

const getUsers =
  async (req, res) => {

    try {

      const users =
        await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

      res.json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });

    }
};

module.exports = {
  getUsers,
};