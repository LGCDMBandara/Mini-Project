const transporter = require('../config/nodemailer');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register a new user
exports.signup = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email already registered' });
      }
  
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during registration:', error);  // Log the detailed error
      res.status(500).json({ error: 'Error registering user', details: error.message });
    }
  };
  

// User login
exports.login = async (req, res) => {
    try {
      //console.log("Login Request Body:", req.body);
      const { email, password } = req.body;
  
      // Check if the email exists
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ error: 'User not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid credentials");
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error("Error during login:", error); // Log the error
      res.status(500).json({ error: 'Error logging in', details: error.message });
    }
  };
  

exports.changePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ error: 'Invalid OTP or OTP expired' });
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
  // Using Math.random() to generate a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOtp = async (req, res) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ error: 'User not found' });
      }

      const otp = generateOtp();  // Use the fallback function
      user.otp = otp;
      user.otpExpires = Date.now() + 600000;
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
