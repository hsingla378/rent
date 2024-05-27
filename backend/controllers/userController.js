const User = require("../models/User");
const Property = require("../models/Property");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Register User
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, isSeller } =
    req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      isSeller,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ message: "User created successfully" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        res.json({ user, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get User by ID
// exports.getUserById = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findById(userId).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// exports.getUserById = async (req, res) => {
//   const userId = req.params.id;
//   console.log("userId", userId);
//   console.log("req.user.id", req.user.id);
//   try {
//     const user = await User.findById(userId)
//     const seller = await User.findById(req.user.id)
//     const properties = await Property.find({ userId: seller.id });

//     if (!user || !seller) {
//       return res.status(404).json({ msg: "User or seller not found" });
//     }

//     const emailContentUser = `
//       <h1>User Details</h1>
//       <p>Name: ${user.firstName} ${user.lastName}</p>
//       <p>Email: ${user.email}</p>
//       <p>Phone: ${user.phoneNumber}</p>
//       <h2>Seller Details</h2>
//       <p>Name: ${seller.firstName} ${seller.lastName}</p>
//       <p>Email: ${seller.email}</p>
//       <p>Phone: ${seller.phoneNumber}</p>
//       <h2>Property Details</h2>
//       ${properties
//         .map(
//           (property) => `
//         <p>Place: ${property.place}</p>
//         <p>Area: ${property.area}</p>
//         <p>Bedrooms: ${property.bedrooms}</p>
//         <p>Bathrooms: ${property.bathrooms}</p>
//         <p>Price: ${property.price}</p>
//         <p>Description: ${property.description}</p>
//         <hr />
//       `
//         )
//         .join("")}
//     `;

//     const emailContentSeller = `
//       <h1>Seller Details</h1>
//       <p>Name: ${seller.firstName} ${seller.lastName}</p>
//       <p>Email: ${seller.email}</p>
//       <p>Phone: ${seller.phoneNumber}</p>
//       <h2>User Details</h2>
//       <p>Name: ${user.firstName} ${user.lastName}</p>
//       <p>Email: ${user.email}</p>
//       <p>Phone: ${user.phoneNumber}</p>
//     `;

//     // Send email to the user
//     const mailOptionsUser = {
//       from: process.env.EMAIL,
//       to: user.email,
//       subject: "Property and Seller Details",
//       html: emailContentUser,
//     };

//     // Send email to the seller
//     const mailOptionsSeller = {
//       from: process.env.EMAIL,
//       to: seller.email,
//       subject: "User Details",
//       html: emailContentSeller,
//     };

//     transporter.sendMail(mailOptionsUser, (error, info) => {
//       if (error) {
//         console.error(`Error sending email to user: ${error}`);
//         return res.status(500).send("Error sending email to user");
//       }
//       console.log(`Email sent to user: ${info.response}`);
//     });

//     transporter.sendMail(mailOptionsSeller, (error, info) => {
//       if (error) {
//         console.error(`Error sending email to seller: ${error}`);
//         return res.status(500).send("Error sending email to seller");
//       }
//       console.log(`Email sent to seller: ${info.response}`);
//     });

//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// Get Seller Details and Send Emails
exports.getSellerAndSendEmails = async (req, res) => {
  const { userId, propertyId } = req.params;
  try {
    const seller = await User.findById(userId);
    const user = await User.findById(req.user.id);
    const property = await Property.findById(propertyId);

    // console.log("user", user);
    // console.log("seller", seller);

    if (!user || !seller || !property) {
      return res
        .status(404)
        .json({ msg: "User, seller, or property not found" });
    }

    const emailContentUser = `
      <h1>Property Details</h1>
      <p>Place: ${property.place}</p>
      <p>Area: ${property.area}</p>
      <p>Bedrooms: ${property.bedrooms}</p>
      <p>Bathrooms: ${property.bathrooms}</p>
      <p>Price: ${property.price}</p>
      <p>Description: ${property.description}</p>
      <hr />
      <h1>Seller Details</h1>
      <p>Name: ${seller.firstName} ${seller.lastName}</p>
      <p>Email: ${seller.email}</p>
      <p>Phone: ${seller.phoneNumber}</p>
    `;

    const emailContentSeller = `
      <h1>User Details</h1>
      <p>Name: ${user.firstName} ${user.lastName}</p>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phoneNumber}</p>
      <hr />
      <h1>Property Details</h1>
      <p>Place: ${property.place}</p>
      <p>Area: ${property.area}</p>
      <p>Bedrooms: ${property.bedrooms}</p>
      <p>Bathrooms: ${property.bathrooms}</p>
      <p>Price: ${property.price}</p>
      <p>Description: ${property.description}</p>
    `;

    // Send email to the user
    const mailOptionsUser = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Property and Seller Details",
      html: emailContentUser,
    };

    // Send email to the seller
    const mailOptionsSeller = {
      from: process.env.EMAIL,
      to: seller.email,
      subject: "User Details",
      html: emailContentSeller,
    };

    transporter.sendMail(mailOptionsUser, (error, info) => {
      if (error) {
        console.error(`Error sending email to user: ${error}`);
        return res.status(500).send("Error sending email to user");
      }
      console.log(`Email sent to user: ${info.response}`);
    });

    transporter.sendMail(mailOptionsSeller, (error, info) => {
      if (error) {
        console.error(`Error sending email to seller: ${error}`);
        return res.status(500).send("Error sending email to seller");
      }
      console.log(`Email sent to seller: ${info.response}`);
    });

    res.json(seller);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
