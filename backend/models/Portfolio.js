import mongoose from 'mongoose';

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  color: { type: String, default: '#f97316' }
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  desc: { type: String, default: '' },
  icon: { type: String, default: '🏆' },
  color: { type: String, default: '#f97316' },
  badge: { type: String, default: '' }
});

const experienceSchema = new mongoose.Schema({
  type: { type: String, enum: ['education', 'project', 'experience'], default: 'project' },
  title: { type: String, required: true },
  org: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  period: { type: String, required: true },
  icon: { type: String, default: '💼' },
  color: { type: String, default: '#f97316' },
  details: { type: [String], default: [] }
});

const portfolioSchema = new mongoose.Schema(
  {
    personal: {
      name: { type: String, default: 'Siddharth Yadav' },
      title: { type: String, default: 'Full Stack Developer | MERN Stack | Java | SDE-I' },
      email: { type: String, default: 'hydrasiddhu213@gmail.com' },
      phone: { type: String, default: '+916393380272' },
      location: { type: String, default: 'Prayagraj, India' },
      github: { type: String, default: 'https://github.com/siddharthaarao' },
      leetcode: { type: String, default: 'https://leetcode.com/si12ssdd' },
      summary: {
        type: String,
        default: 'Results-driven Full Stack Developer and B.Tech Computer Science graduate (2026) with hands-on experience designing and deploying production-grade MERN stack applications. Proficient in RESTful API development, JWT and OAuth 2.0 authentication, Razorpay payment integration, and scalable React.js with Redux Toolkit frontends.'
      }
    },
    stats: {
      projectsDeployed: { type: Number, default: 3 },
      apisBuilt: { type: Number, default: 10 },
      certifications: { type: Number, default: 4 },
      yearsOfCoding: { type: Number, default: 3 }
    },
    skills: {
      languages: { type: [skillItemSchema], default: [] },
      frontend: { type: [skillItemSchema], default: [] },
      backend: { type: [skillItemSchema], default: [] },
      databases: { type: [skillItemSchema], default: [] },
      tools: { type: [skillItemSchema], default: [] }
    },
    education: {
      institution: { type: String, default: 'Lovely Professional University' },
      location: { type: String, default: 'Punjab, India' },
      degree: { type: String, default: 'B.Tech Computer Science and Engineering' },
      period: { type: String, default: 'Aug 2022 - May 2026' },
      cgpa: { type: String, default: '7.09/10' },
      intermediate: { type: String, default: '76.8%' },
      matriculation: { type: String, default: '85.4%' }
    },
    certifications: { type: [certificationSchema], default: [] },
    experience: { type: [experienceSchema], default: [] }
  },
  {
    timestamps: true
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
