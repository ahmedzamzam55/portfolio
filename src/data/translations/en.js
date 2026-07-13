/**
 * English Translation Data
 * 
 * Data Layer — Contains only static data, no logic.
 * Following Open/Closed Principle: To add new content,
 * simply add new entries here without modifying any component.
 */
export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hello, I'm",
    desc: 'I build modern, scalable web applications that help businesses grow.',
    viewWork: 'View My Work',
    contactMe: 'Contact Me',
  },
  typing: [
    'Building Web Applications',
    'Creating CRM Systems',
    'Designing Modern UIs',
    'Developing Enterprise Solutions',
  ],
  about: {
    title: 'About Me',
    desc: "I'm a passionate Full Stack Developer based in Saudi Arabia with expertise in building modern web applications, CRM systems, and enterprise solutions. I specialize in React.js, Laravel, and Node.js to create scalable, high-performance digital experiences.",
    projects: 'Projects',
    years: 'Years Exp.',
    tech: 'Technologies',
    satisfaction: 'Satisfaction',
  },
  skills: {
    title: 'Skills & Technologies',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    tools: 'Tools',
  },
  projects: {
    title: 'My Projects',
    liveDemo: 'Live Demo',
    watchVideo: 'Watch Video',
    closeVideo: 'Close',
    all: 'All',
    website: 'Website',
    webapp: 'Web App',
    saas: 'SaaS',
    problem: 'Problem',
    solution: 'Solution',
    result: 'Result',
  },
  projectList: [
    {
      name: 'AKNAN LLC',
      desc: 'Professional corporate website for a leading construction & industrial company in Saudi Arabia with bilingual support.',
      caseStudy: {
        problem: 'Lack of professional, bilingual online brand representation and marketing reach.',
        solution: 'Developed a high-performance, responsive React web interface with optimized asset loading.',
        result: 'Achieved 100% online presence, increased search engine visibility and user engagement.'
      },
      tags: ['React.js', 'Vite', 'CSS3'],
      url: 'https://www.aknanllc.com/',
      img: '/assets/projects/aknan-llc.webp',
      cat: 'website',
    },
    {
      name: 'Academic Platform',
      desc: 'Comprehensive academic management platform for educational institutions with student tracking.',
      caseStudy: {
        problem: 'Inflexible, manual handling of student performance records, timetables, and teacher allocations.',
        solution: 'Created a centralized dashboard using Laravel & React with automated schedule conflicts detection.',
        result: 'Saved over 50% of scheduling admin time and established instant analytical reporting for school management.'
      },
      tags: ['Laravel', 'React.js', 'MySQL'],
      video: 'https://drive.google.com/file/d/1pwOXSe4P-14pRlxQIaPox9mDRz5LASX1/preview',
      img: '/assets/projects/academic-platform-thumb.webp',
      cat: 'webapp',
    },
    {
      name: 'ENgaz CRM',
      desc: 'Full-featured CRM system for construction operations including project tracking and dashboards.',
      caseStudy: {
        problem: 'Scattered paperwork, missed deadlines, and poor visual overview of ongoing construction projects.',
        solution: 'Built a custom CRM platform with dynamic task workflows, visual milestone progress bars, and document vaults.',
        result: 'Drastically improved project delivery time and provided management with real-time financial tracking.'
      },
      tags: ['React.js', 'Laravel', 'MySQL'],
      url: 'https://works.aknanllc.com/',
      img: '/assets/projects/engaz-crm.webp',
      cat: 'webapp',
    },
    {
      name: 'Engineering Site Monitoring',
      desc: 'Advanced system for monitoring and tracking engineering site operations and progress reporting.',
      caseStudy: {
        problem: 'Delays in getting daily progress logs and visual site updates from engineers in the field.',
        solution: 'Designed a mobile-first tracking system using Inertia.js to submit geolocated photo logs and workflow forms.',
        result: 'Provided management with immediate visibility into site activities, resolving remote issues 40% faster.'
      },
      tags: ['Laravel', 'Inertia.js', 'React.js'],
      video: 'https://drive.google.com/file/d/1iw9hOWd45ZxBMvERn58U8J0Z-1pbJbfS/preview',
      img: '/assets/projects/site-monitoring-thumb.webp',
      cat: 'webapp',
    },
    {
      name: 'Aknan Scope',
      desc: 'Enterprise project management system with multi-tenant company management and expense tracking.',
      caseStudy: {
        problem: 'Lack of unified auditing for financial activities, files, and staff privileges across subsidiaries.',
        solution: 'Implemented a multi-tenant corporate platform with granular role-based permissions (RBAC) and strict security.',
        result: 'Secured all critical transactions, automated document version tracking, and unified business reports.'
      },
      tags: ['Laravel', 'Inertia.js', 'React.js'],
      url: 'https://aknanllc-scope.com/login',
      img: '/assets/projects/aknan-scope.webp',
      cat: 'webapp',
    },
    {
      name: 'Company & Progress Tracking',
      desc: 'Enterprise system for tracking company operations and completion percentages.',
      caseStudy: {
        problem: 'Manual spreadsheets causing mistakes and confusion in calculating completion metrics for key tasks.',
        solution: 'Programmed a smart progress calculating engine with responsive charts and automatic alert notifications.',
        result: 'Eliminated computation errors and provided stakeholders with a precise, real-time visual progress roadmap.'
      },
      tags: ['Laravel', 'React.js', 'MySQL'],
      video: 'https://drive.google.com/file/d/1qY11KpLas4AebrGaw15tE5XXPqgm6U36/preview',
      img: '/assets/projects/company-tracking-thumb.webp',
      cat: 'webapp',
    },
    {
      name: 'Engineering Consultation',
      desc: 'Modern platform for engineering consultations supporting structural, electrical, and mechanical services.',
      caseStudy: {
        problem: 'High barrier of entry for clients requesting technical quotes and consultation bookings offline.',
        solution: 'Developed an interactive questionnaire portal allowing users to input project details and receive quick bids.',
        result: 'Boosted online client conversion rates and streamlined technical department responses.'
      },
      tags: ['React.js', 'Vite', 'CSS3'],
      url: 'https://ahmedzamzam55.github.io/engineering-consultation-system/',
      img: '/assets/projects/engineering-consultation.webp',
      cat: 'saas',
    },
  ],
  pricing: {
    title: 'Pricing Packages',
    startFrom: 'Starting from',
    getStarted: 'Get Started',
    popular: 'Most Popular',
    plans: [
      {
        badge: 'Basic',
        desc: 'Ideal for startups wanting a quick & professional landing page to showcase services.',
        amount: 'Based on Specs',
        customPrice: true,
        features: [
          'Landing Page / Up to 5 Pages',
          'Responsive Design',
          'Basic SEO Setup',
          'Contact Form',
          '1 Month Support',
        ],
      },
      {
        badge: 'Professional',
        desc: 'Perfect for growing businesses needing an admin portal and SEO optimization.',
        amount: 'Upon Agreement',
        customPrice: true,
        features: [
          'Custom Website up to 15 Pages',
          'Admin Dashboard',
          'Advanced SEO & Analytics',
          'Multi-language (AR/EN)',
          'Database Integration',
          '3 Months Support',
        ],
      },
      {
        badge: 'Enterprise',
        desc: 'For organizations requiring complex software, CRM/ERP systems, and custom automation.',
        amount: 'On Demand',
        customPrice: true,
        features: [
          'Full Stack Web Application',
          'Custom CRM/ERP System',
          'User Roles & Permissions',
          'API Development',
          'Cloud Deployment',
          '6 Months Support',
        ],
      },
    ],
  },
  cta: {
    title: 'Have a project in mind?',
    subtitle: "Let's team up to build a high-performance web application that drives business growth.",
    button: "Let's Talk",
  },
  testimonials: {
    title: 'What Clients Say',
    list: [
      {
        text: 'Ahmed built our corporate website and CRM system with exceptional quality. His attention to detail and technical expertise exceeded our expectations. Highly recommended!',
        name: 'Mohammed Al-Rashid',
        role: 'CEO, Construction Company',
        stars: 5,
      },
      {
        text: 'Working with Ahmed was a great experience. He delivered our project management system on time with all the features we needed. Professional and responsive throughout the process.',
        name: 'Khalid Abdullah',
        role: 'Project Manager',
        stars: 5,
      },
      {
        text: 'Ahmed created a beautiful and functional engineering consultation platform for us. The bilingual support and modern UI design were exactly what we needed. Excellent work!',
        name: 'Eng. Sara Al-Otaibi',
        role: 'Engineering Firm Director',
        stars: 4.5,
      },
    ],
  },
  contact: {
    title: 'Get In Touch',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    chatWith: 'Chat with me',
    namePh: 'Your Name',
    emailPh: 'Your Email',
    selectService: 'Select Service',
    basic: 'Basic Package',
    professional: 'Professional Package',
    enterprise: 'Enterprise Package',
    custom: 'Custom Project',
    messagePh: 'Your Message',
    send: 'Send Message',
    sending: 'Sending...',
  },
  footer: {
    role: 'Full Stack Developer',
    rights: 'All rights reserved.',
    builtWith: 'Built by Ahmed Zamzam',
  },
  toast: {
    successTitle: 'Message sent successfully!',
    successDesc: "I'll get back to you soon.",
    errorTitle: 'Failed to send message',
    errorDesc: 'Please try again or contact me via WhatsApp.',
  },
};
