import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Portfolio from '../models/Portfolio.js';
import { DEFAULT_PORTFOLIO } from './defaultPortfolio.js';


const projects = [
  {
    title: 'AI Text-to-Image Generator',
    shortDescription:
      'Production-ready MERN app with AI image generation, Razorpay payments, and JWT-secured REST APIs.',
    description:
      'A full-stack AI-powered image generation platform built with the MERN stack. Users can generate images from text prompts using a third-party AI API, with a credit-based monetization system powered by Razorpay.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Razorpay', 'REST API'],
    achievements: [
      'Developed a production-ready MERN application integrating a third-party AI image API, efficiently processing over 100 concurrent asynchronous requests.',
      'Implemented Razorpay for credit-based monetization, incorporating real-time MongoDB balance tracking to facilitate seamless in-app purchases.',
      'Secured over 10 REST API endpoints using JWT and RBAC, achieving zero unauthorized access incidents in production.',
      'Deployed a fully responsive React.js and Tailwind CSS UI via CI/CD pipeline on Vercel, maintaining 99% uptime across all devices.',
    ],
    githubUrl: 'https://github.com/si12ssdd',
    liveUrl: 'https://text-to-image-frontend-sigma.vercel.app/',
    imageGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B21A8 100%)',
    featured: true,
    order: 1,
    startDate: 'Jul 2025',
    endDate: 'Present',
    category: 'fullstack',
  },
  {
    title: 'Affiliate Link Analytics Platform',
    shortDescription:
      'Multi-role SaaS platform with real-time analytics dashboards, OAuth 2.0, and Razorpay webhooks.',
    description:
      'A multi-role SaaS platform built for affiliate marketers. Features real-time click & conversion analytics, tiered subscription plans, Google OAuth 2.0 authentication, and automated email workflows.',
    techStack: ['React.js', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Chart.js', 'OAuth 2.0'],
    achievements: [
      'Developed a multi-role SaaS platform with real-time click & conversion analytics dashboards using Chart.js, supporting 2 user roles with granular access controls.',
      'Integrated Google OAuth 2.0, JWT, Nodemailer, and Razorpay webhooks for secure user onboarding, email automation, and payment verification.',
      'Managed global state with Redux Toolkit across 15+ components, reducing prop-drilling by 40% and enabling scalable feature expansion.',
    ],
    githubUrl: 'https://github.com/si12ssdd',
    liveUrl: 'https://affiliate-link-sharing.vercel.app/',
    imageGradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    featured: true,
    order: 2,
    startDate: 'Jun 2025',
    endDate: 'Present',
    category: 'fullstack',
  },
  {
    title: 'Role-Based Task Management System',
    shortDescription:
      'Responsive SPA with Admin & Employee dashboards, 5 task workflows, and Context API state management.',
    description:
      'A responsive single-page application featuring role-specific dashboards for Admin and Employee users. Supports 5 task workflows including assignment, priority tagging, and real-time status tracking.',
    techStack: ['React.js', 'Context API', 'Tailwind CSS', 'JavaScript'],
    achievements: [
      'Built a responsive SPA with two role-specific dashboards (Admin & Employee), supporting 5 task workflows including assignment, priority tagging, and real-time status tracking.',
      'Implemented browser-side task persistence for zero-backend session continuity, reducing task management overhead for 2 user roles.',
      'Designed a modular component architecture using Context API, enabling state sharing across 10+ components without external libraries.',
    ],
    githubUrl: 'https://github.com/si12ssdd',
    liveUrl: 'https://task-managment-silk.vercel.app/',
    imageGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
    featured: true,
    order: 3,
    startDate: 'Feb 2025',
    endDate: 'Present',
    category: 'frontend',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Project.deleteMany({});
    await Portfolio.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL || 'hydrasiddhu213@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Siddharth Yadav',
    });
    console.log(`👤 Admin created: ${admin.email}`);

    // Create projects
    const createdProjects = await Project.insertMany(projects);
    console.log(`📁 ${createdProjects.length} projects seeded`);

    // Create default portfolio data
    await Portfolio.create(DEFAULT_PORTFOLIO);
    console.log('👤 Portfolio seeded successfully!');

    console.log('\n✅ Database seeded successfully!');
    console.log(`\n🔐 Admin Login:`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
