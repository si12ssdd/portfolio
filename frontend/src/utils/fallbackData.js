export const FALLBACK_PORTFOLIO = {
  personal: {
    name: 'Siddharth Yadav',
    title: 'Full Stack Developer | MERN Stack Developer | Backend Developer',
    email: 'hydrasiddhu213@gmail.com',
    phone: '+916393380272',
    location: 'Prayagraj, India',
    github: 'https://github.com/si12ssdd',
    leetcode: 'https://leetcode.com/u/hydrasiddhu213/',
    summary: 'Results-driven Full Stack Developer and B.Tech Computer Science graduate (2026) with hands-on experience designing and deploying 3 production-grade MERN stack applications. Proficient in RESTful API development, JWT and OAuth 2.0 authentication, Razorpay payment integration, and scalable React.js with Redux Toolkit frontends.'
  },
  stats: {
    projectsDeployed: 3,
    apisBuilt: 10,
    certifications: 4,
    yearsOfCoding: 3
  },
  skills: {
    languages: [
      { name: 'Java', icon: '☕', color: '#f59e0b' },
      { name: 'JavaScript', icon: '🟨', color: '#f59e0b' },
      { name: 'SQL', icon: '🗄️', color: '#f59e0b' }
    ],
    frontend: [
      { name: 'React', icon: '⚛️', color: '#61DAFB' },
      { name: 'Redux Toolkit', icon: '🔄', color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: '💨', color: '#61DAFB' },
      { name: 'HTML', icon: '🟧', color: '#61DAFB' },
      { name: 'CSS', icon: '🎨', color: '#61DAFB' }
    ],
    backend: [
      { name: 'Node.js', icon: '🟢', color: '#339933' },
      { name: 'Express.js', icon: '🚂', color: '#339933' },
      { name: 'REST APIs', icon: '🔌', color: '#339933' },
      { name: 'JWT Auth', icon: '🔑', color: '#339933' }
    ],
    databases: [
      { name: 'MongoDB', icon: '🍃', color: '#47A248' },
      { name: 'MySQL', icon: '🐬', color: '#47A248' }
    ],
    tools: [
      { name: 'Git', icon: '🌿', color: '#a855f7' },
      { name: 'GitHub', icon: '⌥', color: '#a855f7' },
      { name: 'Postman', icon: '📬', color: '#a855f7' },
      { name: 'Vercel', icon: '▲', color: '#a855f7' }
    ]
  },
  education: {
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    degree: 'B.Tech Computer Science and Engineering',
    period: 'Aug 2022 - May 2026',
    cgpa: '7.09/10'
  },
  certifications: [
    {
      name: 'Industry 4.0 & IIoT',
      issuer: 'NPTEL',
      desc: 'Industrial IoT, smart manufacturing systems, cyber-physical automation, and device-to-cloud connectivity.',
      icon: '🏭',
      color: '#b15f2c',
      badge: 'NPTEL',
      link: 'https://nptel.ac.in/'
    },
    {
      name: 'Cloud Computing',
      issuer: 'Coursera',
      desc: 'Fundamentals of cloud architecture, distributed systems, deployment models, and serverless infrastructure.',
      icon: '☁️',
      color: '#4A90D9',
      badge: 'Coursera',
      link: 'https://www.coursera.org/'
    },
    {
      name: 'Data Structures & Algorithms',
      issuer: 'GeeksforGeeks',
      desc: 'Comprehensive DSA — Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and complexity analysis.',
      icon: '🧮',
      color: '#2F8D46',
      badge: 'GfG',
      link: 'https://www.geeksforgeeks.org/'
    },
    {
      name: 'MongoDB for Developers',
      issuer: 'Google',
      desc: 'Advanced MongoDB schema patterns, aggregation pipelines, performance indexing, and developer workflows.',
      icon: '🍃',
      color: '#47A248',
      badge: 'Google',
      link: 'https://grow.google/'
    }
  ],
  experience: [
    {
      type: 'education',
      title: 'B.Tech Computer Science & Engineering',
      org: 'Lovely Professional University',
      location: 'Punjab, India',
      period: 'Aug 2022 – May 2026',
      icon: '🎓',
      color: '#f59e0b',
      details: [
        'CGPA: 7.09/10',
        'Focused on DSA, OOP, DBMS, and Web Development',
        'Built 3 full-stack projects during coursework'
      ]
    },
    {
      type: 'project',
      title: 'AI Text-to-Image Generator',
      org: 'Personal Project',
      location: 'Remote',
      period: 'Jul 2025 – Present',
      icon: '🤖',
      color: '#a855f7',
      details: [
        'MERN stack app with third-party AI image API',
        'Razorpay credit monetization + MongoDB balance tracking',
        '10+ REST endpoints secured with JWT & RBAC'
      ]
    },
    {
      type: 'project',
      title: 'Affiliate Link Analytics Platform',
      org: 'Personal Project',
      location: 'Remote',
      period: 'Jun 2025 – Present',
      icon: '📊',
      color: '#06b6d4',
      details: [
        'Multi-role SaaS with Chart.js analytics dashboards',
        'Google OAuth 2.0, JWT, Nodemailer, Razorpay webhooks',
        'Redux Toolkit global state architecture'
      ]
    },
    {
      type: 'project',
      title: 'RAHIO Task Management App',
      org: 'Personal Project',
      location: 'Remote',
      period: 'Feb 2025 – Present',
      icon: '📋',
      color: '#b15f2c',
      details: [
        'Vite + React single page app with Local Storage persistence',
        'Context API global state shared across components',
        'Responsive Tailwind CSS design'
      ]
    }
  ],
  projects: [
    {
      _id: 'proj1',
      title: 'AI SaaS – AI Text-to-Image Generator',
      shortDescription: 'Production-ready MERN application offering AI-powered image generation from text prompts, user credit balances, and secure transaction workflows.',
      description: 'A full-stack AI-powered image generation platform built with the MERN stack. Users can generate high-quality images from text prompts using an integrated AI model API. Monetization is handled through a credit balance system powered by Razorpay payments.',
      techStack: ['MERN', 'JWT', 'Razorpay', 'Tailwind', 'REST API'],
      achievements: [
        'Integrated a third-party AI image generation API with Node.js/Express.js backend endpoints.',
        'Secured user accounts and session routes using custom JSON Web Tokens (JWT) and cookies.',
        'Incorporated Razorpay checkout widgets and webhooks for real-time account balance updates.'
      ],
      githubUrl: 'https://github.com/si12ssdd',
      liveUrl: 'https://text-to-image-frontend-sigma.vercel.app/',
      imageGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B21A8 100%)',
      featured: true,
      order: 1,
      startDate: 'Jul 2025',
      endDate: 'Present',
      category: 'fullstack'
    },
    {
      _id: 'proj2',
      title: 'Affiliate Link Sharing Platform',
      shortDescription: 'SaaS analytics platform with user dashboards, click/conversion telemetry tracking, and automated reporting systems.',
      description: 'An advanced link sharing and conversion analytics tool built for marketers. Features user dashboard panels, granular telemetry logs (clicks, referrers, device types) visualized with Chart.js, and automated subscriber alerts.',
      techStack: ['MongoDB', 'Express', 'React', 'Node', 'Chart.js', 'Redux Toolkit'],
      achievements: [
        'Developed interactive analytics dashboards with real-time conversion charts.',
        'Configured automated email reports with Nodemailer triggered by system events.',
        'Leveraged Redux Toolkit for unified telemetry data mapping, reducing layout shifts.'
      ],
      githubUrl: 'https://github.com/si12ssdd',
      liveUrl: 'https://affiliate-link-sharing.vercel.app/',
      imageGradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      featured: true,
      order: 2,
      startDate: 'Jun 2025',
      endDate: 'Present',
      category: 'fullstack'
    },
    {
      _id: 'proj3',
      title: 'RAHIO Task Management App',
      shortDescription: 'Single-page task planner and team productivity system featuring Local Storage session backup and responsive workflows.',
      description: 'A productivity application designed to organize daily work lists. Utilizes Vite for fast load speeds, Tailwind CSS for clean layout boundaries, and Context API for global task lifecycle updates.',
      techStack: ['React', 'Vite', 'Tailwind', 'Context API', 'Local Storage'],
      achievements: [
        'Built interactive Kanban-style task columns with drag updates and priority levels.',
        'Implemented zero-backend browser-side Local Storage caching for user session persistence.',
        'Optimized component rendering cycles using standard React hooks.'
      ],
      githubUrl: 'https://github.com/si12ssdd',
      liveUrl: 'https://task-managment-silk.vercel.app/',
      imageGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
      featured: true,
      order: 3,
      startDate: 'Feb 2025',
      endDate: 'Present',
      category: 'frontend'
    }
  ]
};
