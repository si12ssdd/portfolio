import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin._id, admin.email);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/me
// @access  Private
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
