export const DEFAULT_PORTFOLIO = {
  personal: {
    name: 'Siddharth Yadav',
    title: 'Full Stack Developer | MERN Stack | Java | SDE-I',
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
      { name: 'TypeScript', icon: '🔷', color: '#f59e0b' },
      { name: 'Python', icon: '🐍', color: '#f59e0b' }
    ],
    frontend: [
      { name: 'React.js', icon: '⚛️', color: '#61DAFB' },
      { name: 'Redux Toolkit', icon: '🔄', color: '#61DAFB' },
      { name: 'HTML5', icon: '🟧', color: '#61DAFB' },
      { name: 'CSS3', icon: '🎨', color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: '💨', color: '#61DAFB' }
    ],
    backend: [
      { name: 'Node.js', icon: '🟢', color: '#339933' },
      { name: 'Express.js', icon: '🚂', color: '#339933' },
      { name: 'REST API', icon: '🔌', color: '#339933' }
    ],
    databases: [
      { name: 'MongoDB', icon: '🍃', color: '#47A248' },
      { name: 'MySQL', icon: '🐬', color: '#47A248' },
      { name: 'Mongoose', icon: '🦡', color: '#47A248' }
    ],
    tools: [
      { name: 'Git', icon: '🌿', color: '#a855f7' },
      { name: 'GitHub', icon: '⌥', color: '#a855f7' },
      { name: 'Docker', icon: '🐳', color: '#a855f7' },
      { name: 'Linux', icon: '🐧', color: '#a855f7' },
      { name: 'Vercel', icon: '▲', color: '#a855f7' },
      { name: 'Render', icon: '☁️', color: '#a855f7' },
      { name: 'Razorpay', icon: '💳', color: '#a855f7' },
      { name: 'Chart.js', icon: '📊', color: '#a855f7' },
      { name: 'Nodemailer', icon: '✉', color: '#a855f7' },
      { name: 'Postman', icon: '📬', color: '#a855f7' },
      { name: 'VS Code', icon: '🖥️', color: '#a855f7' }
    ]
  },
  education: {
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    degree: 'B.Tech Computer Science and Engineering',
    period: 'Aug 2022 - May 2026',
    cgpa: '7.09/10',
    intermediate: '76.8%',
    matriculation: '85.4%'
  },
  certifications: [
    {
      name: 'Cloud Computing',
      issuer: 'Coursera',
      desc: 'Fundamentals of cloud architecture, deployment models, and distributed systems.',
      icon: '☁️',
      color: '#4A90D9',
      badge: 'Coursera'
    },
    {
      name: 'MongoDB for Developers',
      issuer: 'Coursera (Google)',
      desc: 'Advanced MongoDB schema design, aggregation pipelines, and performance optimization.',
      icon: '🍃',
      color: '#47A248',
      badge: 'Google'
    },
    {
      name: 'Data Structures & Algorithms',
      issuer: 'GeeksforGeeks',
      desc: 'Comprehensive DSA — arrays, trees, graphs, dynamic programming, and complexity analysis.',
      icon: '🧮',
      color: '#2F8D46',
      badge: 'GfG'
    },
    {
      name: 'Industry 4.0 & IIoT',
      issuer: 'NPTEL',
      desc: 'Industrial IoT, automation, cyber-physical systems, and smart manufacturing concepts.',
      icon: '🏭',
      color: '#f97316',
      badge: 'NPTEL'
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
        'Intermediate: 76.8% | Matriculation: 85.4%',
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
        '10+ REST endpoints secured with JWT & RBAC',
        'Deployed on Vercel with 99% uptime'
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
        'Redux Toolkit — 40% reduction in prop drilling',
        'Tiered subscription plans with access controls'
      ]
    },
    {
      type: 'project',
      title: 'Role-Based Task Management System',
      org: 'Personal Project',
      location: 'Remote',
      period: 'Feb 2025 – Present',
      icon: '📋',
      color: '#f97316',
      details: [
        'Admin & Employee dashboards with 5 task workflows',
        'Browser-side persistence for session continuity',
        'Context API state shared across 10+ components',
        'Responsive Tailwind CSS UI'
      ]
    }
  ]
};
