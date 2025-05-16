// controllers/hospitalRequestController.js
const BloodRequest = require('../models/HospitalRequest.js');
const Admin = require('../models/adminSchema.js');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const provinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
];

const districtsByProvince = {
    'Western Province': ['Colombo District', 'Gampaha District', 'Kalutara District'],
    'Central Province': ['Kandy District', 'Matale District', 'NuwaraEliya District'],
    'Southern Province': ['Galle District', 'Matara District', 'Hambantota District'],
    'Northern Province': [
        'Jaffna District',
        'Kilinochchi District',
        'Mannar District',
        'Vavuniya District',
        'Mullaitivu District'
    ],
    'Eastern Province': ['Trincomalee District', 'Batticaloa District', 'Ampara District'],
    'North Western Province': ['Kurunegala District', 'Puttalam District'],
    'North Central Province': ['Anuradhapura District', 'Polonnaruwa District'],
    'Uva Province': ['Badulla District', 'Monaragala District'],
    'Sabaragamuwa Province': ['Ratnapura District', 'Kegalle District']
};

const createBloodRequest = asyncHandler(async (req, res) => {
    const {
        patientName,
        purpose,
        bloodUnits,
        bloodGroup,
        needDate,
        hospital,
        bloodBank,
        province,
        district,
        details
    } = req.body;

    try {
        const hospitalExists = await Admin.findById(hospital);
        if (!hospitalExists || hospitalExists.role !== 'Hospital') {
            console.error('Invalid hospital ID:', hospital);
            res.status(400);
            throw new Error('Invalid hospital');
        }

        const bloodBankExists = await Admin.findById(bloodBank);
        if (!bloodBankExists || bloodBankExists.role !== 'BloodBank') {
            console.error('Invalid blood bank ID:', bloodBank);
            res.status(400);
            throw new Error('Invalid blood bank');
        }

        if (!provinces.includes(province)) {
            console.error('Invalid province:', province);
            res.status(400);
            throw new Error('Invalid province');
        }
        if (!districtsByProvince[province].includes(district)) {
            console.error('Invalid district:', district, 'for province:', province);
            res.status(400);
            throw new Error('Invalid district');
        }

        const bloodRequest = await BloodRequest.create({
            patientName,
            purpose,
            bloodUnits,
            bloodGroup,
            needDate,
            hospital,
            bloodBank,
            province,
            district,
            details,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            data: bloodRequest
        });
    } catch (err) {
        console.error('Create Blood Request Error:', err.message);
        throw err;
    }
});

const getHospitals = asyncHandler(async (req, res) => {
    try {
        const hospitals = await Admin.find({ role: 'Hospital' }).select('username _id');
        if (!hospitals.length) {
            console.warn('No hospitals found in database');
            return res.status(404).json({ success: false, message: 'No hospitals found' });
        }
        res.json({
            success: true,
            data: hospitals.map(h => ({ id: h._id, name: h.username }))
        });
    } catch (err) {
        console.error('Get Hospitals Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error fetching hospitals' });
    }
});

const getBloodBanks = asyncHandler(async (req, res) => {
    try {
        const bloodBanks = await Admin.find({ role: 'BloodBank' }).select('username _ libido');
        if (!bloodBanks.length) {
            console.warn('No blood banks found in database');
            return res.status(404).json({ success: false, message: 'No blood banks found' });
        }
        res.json({
            success: true,
            data: bloodBanks.map(bb => ({ id: bb._id, name: bb.username }))
        });
    } catch (err) {
        console.error('Get Blood Banks Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error fetching blood banks' });
    }
});

const getLocations = asyncHandler(async (req, res) => {
    try {
        const { province } = req.query;
        if (province) {
            if (!provinces.includes(province)) {
                console.error('Invalid province queried:', province);
                return res.status(400).json({ success: false, message: 'Invalid province' });
            }
            res.json({
                success: true,
                data: { districts: districtsByProvince[province] }
            });
        } else {
            res.json({
                success: true,
                data: { provinces }
            });
        }
    } catch (err) {
        console.error('Get Locations Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error fetching locations' });
    }
});

const getBloodRequestsByBloodBank = asyncHandler(async (req, res) => {
    try {
        const bloodRequests = await BloodRequest.find({ bloodBank: req.user._id })
            .populate('hospital', 'username')
            .lean();

        if (!bloodRequests.length) {
            console.warn('No blood requests found for blood bank:', req.user._id);
            return res.status(404).json({ success: false, message: 'No blood requests found' });
        }

        res.json({
            success: true,
            data: bloodRequests.map(request => ({
                _id: request._id,
                patientName: request.patientName,
                hospital: request.hospital.username,
                bloodGroup: request.bloodGroup,
                bloodUnits: request.bloodUnits,
                needDate: request.needDate,
                status: request.status
            }))
        });
    } catch (err) {
        console.error('Get Blood Requests Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error fetching blood requests' });
    }
});

const sendEmail = asyncHandler(async (req, res) => {
    const { bloodRequestId } = req.body;

    try {
        const bloodRequest = await BloodRequest.findById(bloodRequestId)
            .populate('hospital', 'username')
            .populate('bloodBank', 'username');

        if (!bloodRequest) {
            console.error('Blood request not found:', bloodRequestId);
            return res.status(404).json({ success: false, message: 'Blood request not found' });
        }

        if (bloodRequest.bloodBank._id.toString() !== req.user._id.toString()) {
            console.error('Unauthorized access to blood request:', bloodRequestId);
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'dchathura509@gmail.com', 
            subject: '🩺 Blood Request Approved - Urgent Donation Needed',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="color: #e63946;">Blood Request Approved</h2>
                    <p>Dear Donor,</p>
                    <p>We are pleased to inform you that your blood request has been approved. We urgently need your blood donation at our blood bank to help save lives. Please visit the blood bank as soon as possible:</p>
                    <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
                      <span style="padding: 10px; background-color: #e63946; color: #ffffff; border-radius: 5px;">Needed By: ${new Date(bloodRequest.needDate).toLocaleDateString()}</span>
                    </div>
                    <p><strong>Blood Bank :</strong> ${bloodRequest.bloodBank.username}</p>
                    <p><strong>Hospital:</strong> ${bloodRequest.hospital.username}</p>
                    <p><strong>Contact:</strong> 011-456-7890</p>
                    <p>If you’re unable to donate, please share this message with others who might be able to help.</p>
                    <br>
                    <p>Thank you for your support,</p>
                    <p><strong>Blood Connect Team</strong></p>
                  </div>
                  <p style="text-align: center; font-size: 12px; color: #888;">If you have any questions, please contact <a href="mailto:${process.env.EMAIL_USER}" style="color: #e63946;">${process.env.EMAIL_USER}</a>.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        bloodRequest.status = 'Approved';
        await bloodRequest.save();

        res.status(200).json({ success: true, message: 'Email sent and request approved' });
    } catch (error) {
        console.error('Error sending email:', error.message);
        res.status(500).json({ success: false, message: 'Error sending email', details: error.message });
    }
});

module.exports = {
    createBloodRequest,
    getHospitals,
    getBloodBanks,
    getLocations,
    getBloodRequestsByBloodBank,
    sendEmail
};