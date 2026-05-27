const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const {
  OAuth2Client,
} = require(
  "google-auth-library"
);

const client =
  new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
  );

const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // CHECK EMPTY FIELDS
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // CHECK USER EXISTS
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // check user exists
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
  
      // compare password
      const isMatch = await bcrypt.compare(
        password,
        user.password
      );
  
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
  
      // create token
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
  const forgotPassword =
  async (req, res) => {

    try {

      const { email } = req.body;

      // CHECK USER
      const user =
        await prisma.user.findUnique({
          where: { email },
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      // CREATE RESET TOKEN
      const resetToken =
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          {
            expiresIn: "15m",
          }
        );

      // RESET URL
      const resetUrl =
        `http://localhost:5173/reset-password/${resetToken}`;

      // EMAIL HTML
      const html = `
        <h2>Password Reset</h2>

        <p>Click below to reset password:</p>

        <a href="${resetUrl}">
          Reset Password
        </a>
      `;

      // SEND EMAIL
      await sendEmail(
        email,
        "Reset Password",
        html
      );

      res.json({
        message:
          "Reset email sent",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });

    }
};
const googleLogin =
  async (req, res) => {

    try {

      const { access_token } =
        req.body;

      // GET GOOGLE USER
      const response =
        await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization:
                `Bearer ${access_token}`,
            },
          }
        );

      const googleUser =
        await response.json();

      const {
        email,
        name,
      } = googleUser;

      // CHECK USER EXISTS
      let user =
        await prisma.user.findUnique({
          where: {
            email,
          },
        });

      // CREATE USER
      if (!user) {

        user =
          await prisma.user.create({
            data: {
              name,
              email,
              password:
                "google_oauth_user",
            },
          });

      }

      // CREATE JWT
      const token =
        jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn:
              "7d",
          }
        );

      res.json({
        token,
        user,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Google login failed",
      });

    }

};
const resetPassword =
  async (req, res) => {

    try {

      const { token } =
        req.params;

      const { password } =
        req.body;

      // VERIFY TOKEN
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // UPDATE USER
      await prisma.user.update({
        where: {
          id: decoded.id,
        },

        data: {
          password:
            hashedPassword,
        },
      });

      res.json({
        message:
          "Password reset successful",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Invalid or expired token",
      });

    }
};

  module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    forgotPassword,
    resetPassword,
  };