import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const ipAddress = req.ip || req.connection.remoteAddress;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress,
    });

    // Send notification email (optional, won't fail if not configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr/>
            <small>Received at: ${new Date().toLocaleString()}</small>
          `,
        });
      } catch (emailError) {
        console.log('Email notification skipped:', emailError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Thanks for reaching out! I'll get back to you soon.",
      data: { id: contact._id },
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact
// @access  Private
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Contact.countDocuments();
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error.',
    });
  }
};

// @desc    Mark contact as read
// @route   PATCH /api/contact/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    res.status(200).json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
