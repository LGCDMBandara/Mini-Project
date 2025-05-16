const mongoose = require('mongoose');
const Admin = require('../models/adminSchema.js');
const BloodBase = require('../models/bloodSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

exports.addAdmin = async (req, res) => {
  try {
    const { role, username, email, password, province, district, phone } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      role,
      username,
      email,
      password: hashedPassword,
      province,
      district,
      phone,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
    console.error('Error during admin registration:', error.message);
    res.status(500).json({ error: 'Error registering admin', details: error.message });
  }
};

exports.getBloodBankAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ role: 'BloodBank' });
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching blood bank admins:', error.message);
    res.status(500).json({ error: 'Error fetching admins', details: error.message });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            {
                id: admin._id.toString(), // Ensure _id is converted to string
                role: admin.role,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
        console.error('Error during admin login:', error.message);
        res.status(500).json({ error: 'Server error during login', details: error.message });
    }
};

exports.removeBlood = async (req, res) => {
  try {
    const { teamName, date, bloodType, quantity } = req.body;
    const bloodBank = req.user.id;

    const newRequest = new BloodBase({
      teamName,
      date,
      bloodType,
      quantity,
      type: 'request',
      bloodBank,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Blood request recorded successfully' });
  } catch (error) {
    console.error('Error recording blood request:', error.message);
    res.status(500).json({ error: 'Error recording request', details: error.message });
  }
};

exports.addBlood = async (req, res) => {
  try {
    const { teamName, date, bloodType, quantity } = req.body;
    const bloodBank = req.user.id;

    const newDonation = new BloodBase({
      teamName,
      date,
      bloodType,
      quantity,
      type: 'donation',
      bloodBank,
    });

    await newDonation.save();
    res.status(201).json({ message: 'Blood donation recorded successfully' });
  } catch (error) {
    console.error('Error recording blood donation:', error.message);
    res.status(500).json({ error: 'Error recording donation', details: error.message });
  }
};

exports.getBloodRecords = async (req, res) => {
  try {
    const bloodBank = req.user.id;
    const records = await BloodBase.find({ bloodBank });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching blood records:', error.message);
    res.status(500).json({ error: 'Error fetching records', details: error.message });
  }
};

exports.analyzeBlood = async (req, res) => {
    try {
        const adminId = req.user.id;
        console.log('Analyzing blood for adminId:', adminId); // Debug log

        if (!adminId) {
            return res.status(400).json({ error: 'Admin ID is missing from token' });
        }

        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return res.status(400).json({ error: 'Invalid Admin ID format' });
        }

        const result = await BloodBase.aggregate([
            { $match: { bloodBank: new mongoose.Types.ObjectId(adminId) } },
            {
                $group: {
                    _id: { bloodType: '$bloodType', type: '$type' },
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $group: {
                    _id: '$_id.bloodType',
                    quantities: {
                        $push: {
                            status: '$_id.type',
                            totalQuantity: '$totalQuantity',
                        },
                    },
                },
            },
            {
                $project: {
                    bloodType: '$_id',
                    _id: 0,
                    quantities: 1,
                },
            },
        ]);

        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error analyzing blood data:', error);
        res.status(500).json({ error: 'Error analyzing blood data', details: error.message });
    }
};

// controllers/adminController.js
exports.analyzeBlood = async (req, res) => {
    try {
        const { id: targetAdminId } = req.params; // Get admin ID from URL
        const authAdminId = req.user.id; // Get authenticated admin ID from token

        if (!targetAdminId) {
            return res.status(400).json({ error: 'Admin ID is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(targetAdminId)) {
            return res.status(400).json({ error: 'Invalid Admin ID format' });
        }

        // Optional: Restrict access to only the admin's own data
        // if (authAdminId !== targetAdminId) {
        //     return res.status(403).json({ error: 'Unauthorized: You can only view your own blood data' });
        // }

        const result = await BloodBase.aggregate([
            { $match: { bloodBank: new mongoose.Types.ObjectId(targetAdminId) } },
            {
                $group: {
                    _id: { bloodType: '$bloodType', type: '$type' },
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $group: {
                    _id: '$_id.bloodType',
                    quantities: {
                        $push: {
                            status: '$_id.type',
                            totalQuantity: '$totalQuantity',
                        },
                    },
                },
            },
            {
                $project: {
                    bloodType: '$_id',
                    _id: 0,
                    quantities: 1,
                },
            },
        ]);

        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error analyzing blood data:', error);
        res.status(500).json({ error: 'Error analyzing blood data', details: error.message });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid admin ID format' });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.status(200).json({ user: admin });
    } catch (error) {
        console.error('Error fetching admin:', error.message);
        res.status(500).json({ error: 'Error fetching admin', details: error.message });
    }
};