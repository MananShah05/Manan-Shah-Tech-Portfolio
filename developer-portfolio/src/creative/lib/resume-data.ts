export type ProjectVideo = {
  title: string;
  src: string;
  thumbnail: string;
  type: "youtube";
};

export type ProjectDesign = {
  title: string;
  src: string;
};

export type ProjectFolder = {
  title: string;
  thumbnail: string;
  videos: ProjectVideo[];
};

export type Certification = {
  name: string;
  issuer: string;
  type: string;
  status: "Active" | "In Progress" | "Completed";
  credentialId?: string;
  verifyUrl?: string | null;
  description?: string;
  progress?: number;
};

export const resumeData = {
  personal: {
    name: "Manan Shah",
    title: "Creative Designer & Visual Editor",
    college: "Dwarkadas J. Sanghvi College of Engineering, Mumbai",
    graduationYear: 2027,
    currentYear: "Third Year",
    location: "Mumbai, India",
    email: "transcendframes@gmail.com",
    github: "https://github.com/MananShah05",
    linkedin: "https://www.linkedin.com/company/transcend-frames/",
    status: "Founder of Transcend Frames",
  },

  stats: [
    { label: "Projects Completed", value: "100+" },
    { label: "Years Experience", value: "4+" },
    { label: "Brand Partnerships", value: "8+" },
    { label: "Figma Prototypes", value: "12+" },
  ],

  projects: [
    {
      slug: "ai-video-ads",
      title: "AI Video Ads & Marketing",
      shortDesc: "Generative marketing campaigns blending Midjourney, Runway, and AI tools for high-conversion and viral brand appeal.",
      longDesc: "High-impact generative marketing campaigns blending advanced AI creation workflows (Midjourney, Runway Gen-2) for high-conversion and viral brand appeal.",
      stack: ["Generative AI", "Midjourney", "Runway Gen-2", "Ad Strategy", "Creative Direction"],
      github: null,
      live: "https://www.youtube.com/@mananshahstudio",
      status: "Shipped",
      highlight: "Produced viral social campaigns for Sour Bomb Giveaway, Dobiee, and Bhoot Cafe",
      videos: [
        { title: "Sour Bomb Giveaway", src: "https://www.youtube.com/shorts/zx2vq8AgLww", thumbnail: "https://img.youtube.com/vi/zx2vq8AgLww/hqdefault.jpg", type: "youtube" as const },
        { title: "Sour Bomb Ad", src: "https://www.youtube.com/shorts/Tu2x8MAKe8s", thumbnail: "https://img.youtube.com/vi/Tu2x8MAKe8s/hqdefault.jpg", type: "youtube" as const },
        { title: "Piconut Ad", src: "https://www.youtube.com/shorts/XfJf7pYv_WE", thumbnail: "https://img.youtube.com/vi/XfJf7pYv_WE/hqdefault.jpg", type: "youtube" as const },
        { title: "Kachi Kerry Giveaway", src: "https://www.youtube.com/shorts/8yYznVCtx8c", thumbnail: "https://img.youtube.com/vi/8yYznVCtx8c/hqdefault.jpg", type: "youtube" as const },
        { title: "Kachi Kerry Ad", src: "https://www.youtube.com/shorts/0lCVkznjQcY", thumbnail: "https://img.youtube.com/vi/0lCVkznjQcY/hqdefault.jpg", type: "youtube" as const },
        { title: "Kachi Kerry 2", src: "https://www.youtube.com/shorts/eAqLyFXtDZ8", thumbnail: "https://img.youtube.com/vi/eAqLyFXtDZ8/hqdefault.jpg", type: "youtube" as const },
        { title: "Halloween Festive Ad", src: "https://www.youtube.com/shorts/ymgHbV2sLaI", thumbnail: "https://img.youtube.com/vi/ymgHbV2sLaI/hqdefault.jpg", type: "youtube" as const },
        { title: "Dobiee AD - My Toy & Joy", src: "https://www.youtube.com/shorts/e48Nq6uc2vg", thumbnail: "https://img.youtube.com/vi/e48Nq6uc2vg/hqdefault.jpg", type: "youtube" as const },
        { title: "Bhoot Cafe Ad", src: "https://www.youtube.com/shorts/LF_j3u0HY2w", thumbnail: "https://img.youtube.com/vi/LF_j3u0HY2w/hqdefault.jpg", type: "youtube" as const },
      ],
    },
    {
      slug: "3d-designs",
      title: "3D Designs & Modeling",
      shortDesc: "High-fidelity immersive 3D modeling and abstract rendering using Blender, Cinema 4D, and Unreal Engine.",
      longDesc: "High-fidelity immersive 3D modeling and abstract environment rendering using Blender, Cinema 4D, and Unreal Engine for branding and product showcases.",
      stack: ["Blender", "Cinema 4D", "Unreal Engine", "Octane Render", "Lighting & Composition"],
      github: null,
      live: "https://www.youtube.com/@mananshahstudio",
      status: "Shipped",
      highlight: "Designed premium abstract 3D visual environments and complex physics-based product mockups",
      videos: [
        { title: "3D Design Showcase 1", src: "https://youtube.com/shorts/wwvsugt2rpM", thumbnail: "https://img.youtube.com/vi/wwvsugt2rpM/hqdefault.jpg", type: "youtube" as const },
        { title: "3D Design Showcase 2", src: "https://youtu.be/2j_OgRH5NyY", thumbnail: "https://img.youtube.com/vi/2j_OgRH5NyY/hqdefault.jpg", type: "youtube" as const },
        { title: "3D Design Showcase 3", src: "https://youtu.be/tdLM9rCL4OU", thumbnail: "https://img.youtube.com/vi/tdLM9rCL4OU/hqdefault.jpg", type: "youtube" as const },
        { title: "3D Design Showcase 4", src: "https://youtu.be/dJyte1AUjfA", thumbnail: "https://img.youtube.com/vi/dJyte1AUjfA/hqdefault.jpg", type: "youtube" as const },
        { title: "3D Design Showcase 5", src: "https://youtu.be/BTbfZ_3A_QU", thumbnail: "https://img.youtube.com/vi/BTbfZ_3A_QU/hqdefault.jpg", type: "youtube" as const },
      ],
    },
    {
      slug: "animations",
      title: "Motion Graphics & Animations",
      shortDesc: "Cinematic motion graphics, dynamic logo reveals, and scalable micro-animations using After Effects and Rive.",
      longDesc: "Cinematic motion graphics, high-impact brand transitions, dynamic logo reveals, and scalable micro-animations designed for modern web apps using After Effects and Rive.",
      stack: ["After Effects", "Rive", "Vector Motion", "Keyframe Dynamics", "Lottie"],
      github: null,
      live: "https://www.youtube.com/@mananshahstudio",
      status: "Shipped",
      highlight: "Created fluid brand logo animations and seamless micro-interactions for digital campaigns",
      videos: [
        { title: "Animation Showcase 1", src: "https://www.youtube.com/embed/XG-Yjn-j_D0?autoplay=1", thumbnail: "https://img.youtube.com/vi/XG-Yjn-j_D0/hqdefault.jpg", type: "youtube" as const },
        { title: "Animation Showcase 2", src: "https://www.youtube.com/embed/vGZmajSQlHc?autoplay=1", thumbnail: "https://img.youtube.com/vi/vGZmajSQlHc/hqdefault.jpg", type: "youtube" as const },
        { title: "Animation Showcase 3", src: "https://www.youtube.com/embed/USV74JsJZTE?autoplay=1", thumbnail: "https://img.youtube.com/vi/USV74JsJZTE/hqdefault.jpg", type: "youtube" as const },
        { title: "Logo Animation Showcase", src: "https://youtu.be/V_-0SKy9Xcw", thumbnail: "https://img.youtube.com/vi/V_-0SKy9Xcw/hqdefault.jpg", type: "youtube" as const },
        { title: "Logo Animation 1", src: "https://youtu.be/cU4hbs02sZA", thumbnail: "https://img.youtube.com/vi/cU4hbs02sZA/hqdefault.jpg", type: "youtube" as const },
        { title: "Logo Animation 2", src: "https://youtu.be/xKwmE6_RFPA", thumbnail: "https://img.youtube.com/vi/xKwmE6_RFPA/hqdefault.jpg", type: "youtube" as const },
        { title: "Logo Animation 3", src: "https://youtu.be/goJ3IM1JMnE", thumbnail: "https://img.youtube.com/vi/goJ3IM1JMnE/hqdefault.jpg", type: "youtube" as const },
        { title: "Logo Animation 4", src: "https://youtu.be/iVw6gCqjeY4", thumbnail: "https://img.youtube.com/vi/iVw6gCqjeY4/hqdefault.jpg", type: "youtube" as const },
        { title: "Logo Animation 5", src: "https://youtu.be/EZtVIBG28B8", thumbnail: "https://img.youtube.com/vi/EZtVIBG28B8/hqdefault.jpg", type: "youtube" as const },
        { title: "Logo Animation 6", src: "https://youtu.be/dTQxdWyHY4s", thumbnail: "https://img.youtube.com/vi/dTQxdWyHY4s/hqdefault.jpg", type: "youtube" as const },
      ],
    },
    {
      slug: "uiux-design",
      title: "UI/UX Design Prototypes",
      shortDesc: "Interactive, high-fidelity prototypes and responsive web/mobile layouts designed inside Figma.",
      longDesc: "Interactive, high-fidelity prototypes, unified design systems, and highly polished responsive layouts designed inside Figma for modern web and mobile applications.",
      stack: ["Figma", "UI/UX Design", "Wireframing", "Interaction Design", "Responsive Layouts"],
      github: null,
      live: "https://www.figma.com/design/sVScETWlt17ZiyXkcV0JNm/Adidas-Site",
      status: "Shipped",
      highlight: "Designed premium interactive prototypes for Adidas Site, ROG, and highly optimized landing pages",
      designs: [
        { title: "Adidas Site", src: "https://www.figma.com/design/sVScETWlt17ZiyXkcV0JNm/Adidas-Site?node-id=0-1&t=3BIsHeEmBMKyrE7u-1" },
        { title: "ROG & Community Page", src: "https://www.figma.com/design/VX39Uk8foyrhLyFuHEQQkj/Project-2?node-id=0-1&t=xRcMVSF1BXza6k1z-1" },
        { title: "Website Landing Page", src: "https://www.figma.com/proto/IAFSq7OmpPqO8ncaJvPzd1/Website-Landing-Page?node-id=3-2&t=dhGmmRBcAKpTR39q-1" },
      ],
    },
    {
      slug: "video-production",
      title: "Cinematic Video Production",
      shortDesc: "End-to-end video editing, DaVinci Resolve color grading, and visual storytelling for long-form brand content.",
      longDesc: "End-to-end cinematic video editing, advanced DaVinci Resolve color grading, audio sound design, and storytelling for corporate series, marketing campaigns, and viral long-form content.",
      stack: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design", "Audio Mixing"],
      github: null,
      live: "https://www.youtube.com/@mananshahstudio",
      status: "Shipped",
      highlight: "Successfully completed video editing series for Streax India, Expertrons, and high-impact social edits",
      folders: [
        {
          title: "Streax India",
          thumbnail: "https://img.youtube.com/vi/8EsWJK4pGOc/hqdefault.jpg",
          videos: [
            { title: "How to Talk Effectively", src: "https://youtu.be/8EsWJK4pGOc", thumbnail: "https://img.youtube.com/vi/8EsWJK4pGOc/hqdefault.jpg", type: "youtube" as const },
            { title: "Winning Client's Trust", src: "https://youtu.be/Viai7gC0wrM", thumbnail: "https://img.youtube.com/vi/Viai7gC0wrM/hqdefault.jpg", type: "youtube" as const },
            { title: "Verbal & Non Verbal Communication", src: "https://youtu.be/kCRtBxGY3FA", thumbnail: "https://img.youtube.com/vi/kCRtBxGY3FA/hqdefault.jpg", type: "youtube" as const },
            { title: "Phone Manners", src: "https://youtu.be/uk9yMc-XSBc", thumbnail: "https://img.youtube.com/vi/uk9yMc-XSBc/hqdefault.jpg", type: "youtube" as const },
            { title: "How to do Cleansing", src: "https://youtu.be/uQxxXGi1MKM", thumbnail: "https://img.youtube.com/vi/uQxxXGi1MKM/hqdefault.jpg", type: "youtube" as const },
            { title: "How to do Bleach", src: "https://youtu.be/ZsMsiT9CtuU", thumbnail: "https://img.youtube.com/vi/ZsMsiT9CtuU/hqdefault.jpg", type: "youtube" as const },
            { title: "How to do Detan", src: "https://youtu.be/3O2B1uTECsc", thumbnail: "https://img.youtube.com/vi/3O2B1uTECsc/hqdefault.jpg", type: "youtube" as const },
            { title: "How to do Scrub", src: "https://youtu.be/FcMSvwzBOBU", thumbnail: "https://img.youtube.com/vi/FcMSvwzBOBU/hqdefault.jpg", type: "youtube" as const },
            { title: "How to Give Steam", src: "https://youtu.be/6ffrewCNbqc", thumbnail: "https://img.youtube.com/vi/6ffrewCNbqc/hqdefault.jpg", type: "youtube" as const },
            { title: "How to Remove Blackheads", src: "https://youtu.be/EyHsO7_Mcco", thumbnail: "https://img.youtube.com/vi/EyHsO7_Mcco/hqdefault.jpg", type: "youtube" as const },
            { title: "How to do Face Massage", src: "https://youtu.be/CzTaFHRBAk4", thumbnail: "https://img.youtube.com/vi/CzTaFHRBAk4/hqdefault.jpg", type: "youtube" as const },
            { title: "How to Apply Face Mask", src: "https://youtu.be/A-pbYD3fqWs", thumbnail: "https://img.youtube.com/vi/A-pbYD3fqWs/hqdefault.jpg", type: "youtube" as const },
          ],
        },
        {
          title: "Expertrons",
          thumbnail: "https://img.youtube.com/vi/8Y4JyDEfsOQ/hqdefault.jpg",
          videos: [
            { title: "Expertrons", src: "https://youtu.be/8Y4JyDEfsOQ", thumbnail: "https://img.youtube.com/vi/8Y4JyDEfsOQ/hqdefault.jpg", type: "youtube" as const },
          ],
        },
        {
          title: "BJP Campaign",
          thumbnail: "https://img.youtube.com/vi/8_WdNsRLG7g/hqdefault.jpg",
          videos: [
            { title: "Video 1", src: "https://youtu.be/8_WdNsRLG7g", thumbnail: "https://img.youtube.com/vi/8_WdNsRLG7g/hqdefault.jpg", type: "youtube" as const },
            { title: "Video 2", src: "https://youtube.com/shorts/FB8fgi-anwE", thumbnail: "https://img.youtube.com/vi/FB8fgi-anwE/hqdefault.jpg", type: "youtube" as const },
            { title: "Video 3", src: "https://youtube.com/shorts/FfRVy0Y3brw", thumbnail: "https://img.youtube.com/vi/FfRVy0Y3brw/hqdefault.jpg", type: "youtube" as const },
            { title: "Video 4", src: "https://youtube.com/shorts/oAcnxQ6Heo8", thumbnail: "https://img.youtube.com/vi/oAcnxQ6Heo8/hqdefault.jpg", type: "youtube" as const },
            { title: "Video 5", src: "https://youtube.com/shorts/KDuPKyPoUBg", thumbnail: "https://img.youtube.com/vi/KDuPKyPoUBg/hqdefault.jpg", type: "youtube" as const },
            { title: "Video 6", src: "https://youtube.com/shorts/Bz8ru3cQJNY", thumbnail: "https://img.youtube.com/vi/Bz8ru3cQJNY/hqdefault.jpg", type: "youtube" as const },
            { title: "Video 7", src: "https://youtube.com/shorts/YsOPQkOONlE", thumbnail: "https://img.youtube.com/vi/YsOPQkOONlE/hqdefault.jpg", type: "youtube" as const },
          ],
        },
      ],
      videos: [
        { title: "Podcast Edit Showcase", src: "https://www.youtube.com/embed/5P4mI2Bn5yg?autoplay=1", thumbnail: "https://img.youtube.com/vi/5P4mI2Bn5yg/hqdefault.jpg", type: "youtube" as const },
        { title: "Virtual DJ Setup", src: "https://youtu.be/i7HhDd_yvVk", thumbnail: "https://img.youtube.com/vi/i7HhDd_yvVk/hqdefault.jpg", type: "youtube" as const },
      ],
    },
  ],

  certifications: [
    {
      name: "Color Correction & Grading with Adobe Premiere Pro",
      issuer: "Udemy",
      type: "Creative",
      status: "Completed",
      credentialId: "UC-863aa74d-50c8-43ea-bbc5-3731d2b52271",
      verifyUrl: "https://ude.my/UC-863aa74d-50c8-43ea-bbc5-3731d2b52271",
    },
  ] as Certification[],

  hackathons: [
    {
      event: "Pixel Paranoia 2025",
      organizer: "6-Hour Hackathon",
      date: "2025-02-15",
      outcome: "Finalist",
      built: "Designed and prototyped a high-fidelity visual solution under intense time pressure",
      solo: false,
    },
  ],

  experience: [
    {
      company: "Transcend Frames",
      role: "Founder & Creative Director",
      duration: "2022 – Present",
      points: [
        "Founded and scaled a creative technology studio delivering high-end visual assets, ad campaigns, and motion designs",
        "Spearheaded creative direction, motion graphics, and video editing for brands like Streax India, Expertrons, Glassmate, and Grofo",
        "Produced 100+ projects blending brand strategy, storytelling, and immersive design to drive engagement and conversion",
      ],
    },
    {
      company: "Hatimi Retreats",
      role: "Creative Director – Design & Visual Intern",
      duration: "Sep 2025 – Present",
      points: [
        "Lead the development of the brand's visual identity across digital and print channels",
        "Create and execute campaigns, design branding assets and marketing materials",
        "Direct photo/video shoots, and enhance UI/UX to deliver cohesive, engaging experiences",
      ],
    },
    {
      company: "GlassMate Media",
      role: "Lead Visual Editor & Designer",
      duration: "Freelance",
      points: [
        "Collaborated closely with founders to define visual guidelines and execute high-conversion video ads",
        "Designed digital campaigns and custom posters that amplified social media reach and click-through rates (CTR)",
      ],
    },
    {
      company: "Grofo Foundation",
      role: "Creative Media Associate (Intern)",
      duration: "Jun 2025 – Aug 2025",
      points: [
        "Designed and produced training content for Streax India's CSR initiative.",
        "Executed video shoots and post-production using Adobe Premiere Pro and After Effects.",
      ],
    },
  ],

  skills: {
    languages: ["Design Strategy", "Storytelling", "Visual Direction", "Brand Identity"],
    aiml: ["Generative AI Video", "Midjourney", "Runway Gen-2", "AI Production"],
    backend: ["Blender", "Cinema 4D", "Unreal Engine", "Octane Render"],
    frontend: ["Figma", "After Effects", "Premiere Pro", "DaVinci Resolve", "Rive"],
    tools: ["Photoshop", "Illustrator", "Audition", "Lottie", "Framer Motion"],
    currently_learning: ["Spline 3D", "WebGPU rendering", "Interactive Shader design"],
  },

  research: {
    title: "IndianDeepGuard: A Multi-Modal Framework for Deepfake Detection in the Indian Context",
    abstract: "This research presents a multi-modal deepfake detection framework specifically designed for the Indian media context, addressing unique challenges in regional content verification.",
    methodology: ["Data Collection", "Multi-modal Feature Extraction", "Classification", "Evaluation"],
    status: "Under Review",
    coAuthors: [],
  },
};
