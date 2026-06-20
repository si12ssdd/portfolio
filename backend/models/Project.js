import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
    },
    achievements: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    imageGradient: {
      type: String,
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: 'Present',
    },
    category: {
      type: String,
      enum: ['fullstack', 'frontend', 'backend', 'other'],
      default: 'fullstack',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
