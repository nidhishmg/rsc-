// REVA Student Council Mock Data

export const councilInfo = {
  name: "REVA University Student Council",
  tagline: "Your Voice. Your Campus.",
  instagram: "https://www.instagram.com/reva_studentcouncil/",
  founded: "2015",
  totalStudents: "8000+"
};

export const events = [
  {
    id: 1,
    title: "REVAMP 2026 - Cultural Fest",
    description: "The biggest annual cultural festival of REVA University. Join us for 3 days of music, dance, and celebrations.",
    date: "March 15-17, 2026",
    venue: "Saugandhika Open Air Theatre",
    category: "upcoming",
    tags: ["Cultural", "Music", "Dance"]
  },
  {
    id: 2,
    title: "TechSprint Hackathon",
    description: "A 24-hour coding marathon to build innovative solutions for campus sustainability.",
    date: "April 20, 2026",
    venue: "Main Library Block",
    category: "upcoming",
    tags: ["Technical", "Coding"]
  },
  {
    id: 3,
    title: "Inter-School Sports Meet",
    description: "Annual sports competition where different schools battle it out for the Chancellor's Trophy.",
    date: "May 5-10, 2026",
    venue: "REVA Sports Ground",
    category: "upcoming",
    tags: ["Sports", "Competition"]
  },
  {
    id: 4,
    title: "Freshers' Welcome 2025",
    description: "Welcoming the new batch of students to the REVA family with performances and interactions.",
    date: "August 15, 2025",
    venue: "Saugandhika",
    category: "past",
    tags: ["Cultural", "Social"]
  },
  {
    id: 5,
    title: "AI & Future Tech Summit",
    description: "Industry experts discussing the future of AI, robotics, and advanced computing.",
    date: "November 2, 2025",
    venue: "C.V. Raman Seminar Hall",
    category: "past",
    tags: ["Technical", "Seminar"]
  },
  {
    id: 6,
    title: "REVA Kala Darshana",
    description: "Art exhibition showcasing the incredible talent of our fine arts students.",
    date: "January 14, 2026",
    venue: "Architecture Block Atrium",
    category: "past",
    tags: ["Arts", "Exhibition"]
  },
  {
    id: 7,
    title: "Annual Blood Donation Camp",
    description: "Organized by the NSS wing in association with local hospitals.",
    date: "December 5, 2025",
    venue: "Main Block Ground Floor",
    category: "past",
    tags: ["Social", "Camp"]
  },
  {
    id: 8,
    title: "Robotics Workshop",
    description: "Hands-on workshop on building line-follower robots using Arduino.",
    date: "October 20, 2025",
    venue: "REVA NEST",
    category: "past",
    tags: ["Technical", "Workshop"]
  }
];

// All 21 specific clubs requested
export const clubs = [
  { id: 1, name: "Archons", description: "The premier architectural society fostering design innovation.", category: "Arts", logo: null },
  { id: 2, name: "Devbraze", description: "Software development club focused on modern full-stack technologies.", category: "Tech", logo: null },
  { id: 3, name: "Dopamine", description: "The official dance crew of REVA, specializing in contemporary and hip-hop.", category: "Cultural", logo: null },
  { id: 4, name: "Elite", description: "Management strategy and business simulation forum.", category: "Social", logo: null },
  { id: 5, name: "FACE", description: "Forum of Association of Computer Enthusiasts.", category: "Tech", logo: null },
  { id: 6, name: "Force", description: "Fitness and outdoor sports community.", category: "Sports", logo: null },
  { id: 7, name: "Fractionz", description: "Mathematics and analytical puzzle solvers group.", category: "Tech", logo: null },
  { id: 8, name: "GDG", description: "Google Developer Groups on campus.", category: "Tech", logo: null },
  { id: 9, name: "Incentia", description: "Innovation and entrepreneurial cell of REVA.", category: "Social", logo: null },
  { id: 10, name: "KALAAPARVA", description: "Traditional Indian arts, music, and culture preservation club.", category: "Cultural", logo: null },
  { id: 11, name: "Mars", description: "Aerospace and astronomy enthusiasts club.", category: "Tech", logo: null },
  { id: 12, name: "Mavericks", description: "Debate and public speaking society.", category: "Arts", logo: null },
  { id: 13, name: "NARCISSA", description: "Fashion and lifestyle community organizing runway events.", category: "Cultural", logo: null },
  { id: 14, name: "Northeast Community", description: "Cultural forum bringing together students from Northeastern states.", category: "Cultural", logo: null },
  { id: 15, name: "OsCode", description: "Open source contribution and competitive coding club.", category: "Tech", logo: null },
  { id: 16, name: "Realitix", description: "AR/VR and immersive technology development group.", category: "Tech", logo: null },
  { id: 17, name: "REVA Kannada Club", description: "Promoting Kannada literature, language, and culture on campus.", category: "Cultural", logo: null },
  { id: 18, name: "REVA Roboosphere", description: "Advanced robotics and mechatronics lab community.", category: "Tech", logo: null },
  { id: 19, name: "RISA", description: "REVA International Students Association.", category: "Social", logo: null },
  { id: 20, name: "SPARC", description: "Student Performing Arts & Recreation Club.", category: "Cultural", logo: null },
  { id: 21, name: "Under25", description: "Official chapter of the Under25 networking ecosystem.", category: "Social", logo: null }
];

export const councilMembers = [
  { id: 1, name: "Aarushi Verma", role: "President", department: "School of Computing", avatar: "A" },
  { id: 2, name: "Rohan Kumar", role: "Vice President", department: "School of Management", avatar: "R" },
  { id: 3, name: "Priya Gowda", role: "General Secretary", department: "School of ECE", avatar: "P" },
  { id: 4, name: "Kiran Raj", role: "Cultural Secretary", department: "School of Architecture", avatar: "K" },
  { id: 5, name: "Neha Singh", role: "Sports Secretary", department: "School of Legal Studies", avatar: "N" },
  { id: 6, name: "Aditya Mohan", role: "Technical Head", department: "School of CSA", avatar: "A" },
  { id: 7, name: "Sneha Reddy", role: "Public Relations", department: "School of Arts & Humanities", avatar: "S" },
  { id: 8, name: "Varun Desai", role: "Treasurer", department: "School of Commerce", avatar: "V" }
];

// Specific gallery image URLs requested
export const galleryImages = [
  { id: 1, url: "https://files.reva.ac.in/uploads/album/1637408915_f3ac2da0b20ce98aec1d.jpg", title: "Campus Infrastructure", category: "Campus" },
  { id: 2, url: "https://files.reva.ac.in/uploads/album/1637408558_ba27ed7a74616d27031c.jpg", title: "Admin Block", category: "Campus" },
  { id: 3, url: "https://files.reva.ac.in/uploads/album/1637410051_b56f00ad62551259bd77.jpg", title: "Central Library", category: "Campus" },
  { id: 4, url: "https://files.reva.ac.in/uploads/album/1637409650_b7cee27f1a64cf33173d.jpg", title: "Student Innovation", category: "Clubs" },
  { id: 5, url: "https://files.reva.ac.in/uploads/album/1637411173_d31bc10d6629ed1737b9.png", title: "Sports Complex", category: "Sports" },
  { id: 6, url: "https://files.reva.ac.in/uploads/album/1637409904_379ef8fd08c84ea591c0.png", title: "Music Club Performance", category: "Clubs" },
  { id: 7, url: "https://files.reva.ac.in/uploads/album/1637410059_55cd584d866202d4d08e.png", title: "Performing Arts Event", category: "Events" },
  { id: 8, url: "https://files.reva.ac.in/uploads/album/1637410366_ef29a35a7986486d33a2.png", title: "Seminar Hall Session", category: "Events" },
  { id: 9, url: "https://files.reva.ac.in/uploads/album/1637410914_98412e48c7b5b0fc53d9.jpg", title: "Advanced Labs", category: "Campus" },
  { id: 10, url: "https://files.reva.ac.in/uploads/album/1640157658.jpg", title: "Management Fest", category: "Events" },
  { id: 11, url: "https://files.reva.ac.in/uploads/album/1640157832.jpg", title: "Legal Studies Seminar", category: "Events" },
  { id: 12, url: "https://files.reva.ac.in/uploads/album/1640163637.jpg", title: "Allied Sciences Workshop", category: "Events" }
];

export function initializeData() {}
