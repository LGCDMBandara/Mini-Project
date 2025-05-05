const Admin = require('../models/Admin.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const addAdmin = async (req, res) => {
  try {
    const { role, username, email, password, province, district, phone } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      role,
      username,
      email,
      password: hashedPassword,
      province: role === 'BloodBank' ? province : undefined,
      district: role === 'BloodBank' ? district : undefined,
      phone: role === 'BloodBank' ? phone : undefined,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin added successfully.' });
  } catch (error) {
    console.error('Error adding admin:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getBloodBankAdmins = async (req, res) => {
  try {
    const role = req.query.role || 'BloodBank';
    const admins = await Admin.find({ role }).select('username email province district');
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Admin login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Admin login error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { login, addAdmin, getBloodBankAdmins };