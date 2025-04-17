const transporter = require('../config/nodemailer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const validator = require('validator');

// Register a new user
exports.signup = async (req, res) => {
  try {
    const { email } = req.body; // Destructure email from req.body

    const existingUser = await User.findOne({ email });

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Error registering user', details: error.message });
  }
};


// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = 'bloodconnectsl@gmail.com';
    const adminPassword = '123456';

    if (email === adminEmail) {
      if (password === adminPassword) {
        const payload = { email, role: 'admin' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: 'Admin login successful', token });
      } else {
        return res.status(400).json({ error: 'Invalid admin password' });
      }
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid user credentials' });
    }

    const userPayload = { userId: user._id, email, role: 'user' };
    const userToken = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '30d' });
    return res.status(200).json({ message: 'User login successful', token: userToken });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    const otpExpiresTimestamp = new Date(user.otpExpires).getTime();

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP Number' });
    }
    if (otpExpiresTimestamp < Date.now()) {
      return res.status(400).json({ error: 'OTP is expired' });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error changing password', details: error });
  }
}

//OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 600000;
    console.log(user.otpExpires)
    await user.save();

    const mailOptions = {
      from: 'bloodconnectsl@gmail.com',
      to: email,
      subject: '🔐 Your OTP for Password Change',
      html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                      <h2 style="color: #e63946;">Password Change Request</h2>
                      <p>Dear User,</p>
                      <p>We received a request to change your password. Please use the One-Time Password (OTP) below to complete the process:</p>
                      <div style="text-align: center; font-size: 22px; font-weight: bold; margin: 20px 0;">
                          <span style="padding: 10px; background-color: #e63946; color: #ffffff; border-radius: 5px;">${otp}</span>
                      </div>
                      <p><strong>Note:</strong> This OTP is valid for 10 minutes.</p>
                      <p>If you didn’t request this, please ignore this email or contact our support team immediately.</p>
                      <br>
                      <p>Thanks,</p>
                      <p><strong>Blood Connect Team</strong></p>
                  </div>
                  <p style="text-align: center; font-size: 12px; color: #888;">If you have any questions, please contact <a href="mailto:bloodconnectsl@gmail.com" style="color: #e63946;">bloodconnectsl@gmail.com</a>.</p>
              </div>
          `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send OTP email', details: error });
      }
      console.log('OTP sent:', info.response);
    });

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error during OTP generation and sending:', error);
    res.status(500).json({ error: 'Error sending OTP', details: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/profile_pictures';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({ storage });
exports.uploadMiddleware = upload.single('profilePicture');

// Controller function to handle profile picture uploads
exports.uploadProfilePicture = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/uploads/profile_pictures/${req.file.filename}`;
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file', details: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);



    Object.keys(req.body).forEach((key) => {
      if (key !== 'email' && key !== 'password') {
        user[key] = req.body[key];
      }
    });

    if (req.file) {
      user.profilePicture = `uploads/profile_pictures/${req.file.filename}`;
    }

    await user.save();
    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Error updating user profile', details: error.message });
  }
};

// Get user data
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if profile is incomplete
    const isIncompleteProfile =
      user.name &&
      user.email &&
      user.password &&
      !user.fname &&
      !user.lname &&
      !user.tnumber &&
      !user.nic &&
      !user.province &&
      !user.district &&
      !user.city &&
      !user.pcode &&
      !user.address &&
      !user.gender &&
      !user.occupation &&
      !user.dob &&
      !user.weight &&
      !user.bloodgroup &&
      !user.donate &&
      !user.lastDonationDate &&
      !user.profilePicture &&
      (!user.healthInfo || user.healthInfo.length === 0) &&
      (!user.medications || user.medications.length === 0) &&
      (!user.surgeryHistory || user.surgeryHistory.length === 0);

    res.status(200).json({
      message: 'User data retrieved successfully',
      user,
      isIncompleteProfile,
    });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({
      error: 'Error retrieving user data',
      details: error.message,
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.email !== 'bloodconnectsl@gmail.com') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  next();
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password -__v');

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({
      message: 'All users retrieved successfully',
      users,
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      message: 'Internal server error',
      details: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, '-password -__v');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({
      message: 'Internal server error',
      details: error.message,
    });
  }
};

// Fetch in Admin Dashboard
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users', details: error });
  }
};

// Fetch count of users who have only email, name, and password filled, with all other fields empty/null
exports.getFilteredUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments({
      email: { $ne: null, $ne: '' },
      name: { $ne: null, $ne: '' },
      password: { $ne: null, $ne: '' },
      fname: { $in: [null, ''] },
      lname: { $in: [null, ''] },
      tnumber: { $in: [null, ''] },
      nic: { $in: [null, ''] },
      province: { $in: [null, ''] },
      district: { $in: [null, ''] },
      city: { $in: [null, ''] },
      pcode: { $in: [null, ''] },
      address: { $in: [null, ''] },
      gender: { $in: [null, ''] },
      occupation: { $in: [null, ''] },
      dob: { $in: [null, ''] },
      weight: { $in: [null, ''] },
      bloodgroup: { $in: [null, ''] },
      donate: { $in: [null, ''] },
      lastDonationDate: { $in: [null, ''] },
      healthInfo: { $size: 0 },
      medications: { $size: 0 },
      surgeryHistory: { $size: 0 },
      profilePicture: { $in: [null, ''] }
    });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user count', details: error });
  }
};






