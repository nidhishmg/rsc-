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

export const councilMembers = {
  current: [
    { id: 1,  name: "Sharan M",               role: "President",             department: "School of Mechanical Engineering",    photo: "Sharan M.JPG", bio: null, linkedin: null, instagram: null },
    { id: 2,  name: "RD Ashrith",             role: "Vice President",        department: "School of Management Studies",        photo: "RD Ashrith.JPG", bio: null, linkedin: null, instagram: null },
    { id: 3,  name: "Afreen Nuha Khan",       role: "General Secretary",     department: "School of ECE",                       photo: "Afreen Nuha Khan.JPG", bio: null, linkedin: null, instagram: null },
    { id: 4,  name: "Aditya Kumar",           role: "Joint Secretary",       department: "School of Management Studies",        photo: "Aditya Kumar.jpeg", bio: null, linkedin: null, instagram: null },
    { id: 5,  name: "Supreeth Gautham R",     role: "Treasurer",             department: "School of Management Studies",        photo: "Supreeth Gautham.JPG", bio: null, linkedin: null, instagram: null },
    { id: 6,  name: "Pavan HC",               role: "Sports Secretary",      department: "School of CSA",                       photo: "Pavan HC.jpeg", bio: null, linkedin: null, instagram: null },
    { id: 7,  name: "Prithi Pragya Nath",     role: "Sports Secretary",      department: "School of Management Studies",        photo: "Prithi Pragya Nath.JPG", bio: null, linkedin: null, instagram: null },
    { id: 8,  name: "Veeksha MS",             role: "Cultural Secretary",    department: "Department of Psychology",            photo: "Veeksha MS.JPG", bio: null, linkedin: null, instagram: null },
    { id: 9,  name: "Shishir M",              role: "Cultural Secretary",    department: "School of C&IT",                      photo: "Shishir M.JPG", bio: null, linkedin: null, instagram: null },
    { id: 10, name: "Shivana Gowda R",        role: "NSS & NCC Secretary",   department: "School of Commerce",                  photo: "Shivana Gowda.JPG", bio: null, linkedin: null, instagram: null },
    { id: 11, name: "Charles S",              role: "Media Team",            department: "School of CSE",                       photo: "Charles S.JPG", bio: null, linkedin: null, instagram: null },
    { id: 12, name: "Pavan Rao D",            role: "Media Team",            department: "School of ECE",                       photo: "Pavan Rao.JPG", bio: null, linkedin: null, instagram: null },
    { id: 13, name: "Raghavan A",             role: "Media Team",            department: "School of ECE",                       photo: "Raghavan A.JPG", bio: null, linkedin: null, instagram: null },
    { id: 14, name: "MG Nidhish",             role: "Media & Design Team",   department: "School of ECE",                       photo: "MG Nidhish.JPG", bio: null, linkedin: null, instagram: null },
    { id: 15, name: "Sanjay Ramesh",          role: "Technical Team",        department: "School of ECE",                       photo: "Sanjay Ramesh.JPG", bio: null, linkedin: null, instagram: null },
    { id: 16, name: "Mahima Bandela",         role: "Technical Team",        department: "School of Civil Engineering",         photo: "Mahima B.JPG", bio: null, linkedin: null, instagram: null },
    { id: 17, name: "Nikhil Kashyap JV",      role: "PR & Marketing",        department: "School of ECE",                       photo: "Nikhil Kashyap.JPG", bio: null, linkedin: null, instagram: null },
    { id: 18, name: "Nischal Chandrashekhar", role: "PR & Marketing",        department: "School of Mechanical Engineering",    photo: "Nischal Chandrashekhar.JPG", bio: null, linkedin: null, instagram: null },
    { id: 19, name: "Abin Issac Varghese",    role: "Event Management",      department: "School of Management Studies",        photo: "Abin Issac Varghese.jpeg", bio: null, linkedin: null, instagram: null },
    { id: 20, name: "Sudarshan CV",           role: "Event Management",      department: "School of CSE",                       photo: "Sudharshan CV.JPG", bio: null, linkedin: null, instagram: null },
    { id: 21, name: "Rashmi Sambukumar",      role: "Event Management",      department: "School of Performing Arts",           photo: "Rashmi Sambukumar.JPG", bio: null, linkedin: null, instagram: null },
    { id: 22, name: "Aneri Chhatrala",        role: "Club Coordinator",      department: "School of Management Studies",        photo: "Aneri Chhatrala.JPG", bio: null, linkedin: null, instagram: null },
    { id: 23, name: "G Bhavani Shankar",      role: "Club Coordinator",      department: "School of Mechanical Engineering",    photo: "G Bhavani Shankar.JPG", bio: null, linkedin: null, instagram: null },
    { id: 24, name: "Adwaith S",              role: "Club Coordinator",      department: "School of Management Studies",        photo: "Adwaith S.JPG", bio: null, linkedin: null, instagram: null },
    { id: 25, name: "Keerthana Priya",        role: "Club Coordinator",      department: "School of ECE",                       photo: "Keerthana Priya.JPG", bio: null, linkedin: null, instagram: null },
    { id: 26, name: "Laxman Patil",           role: "Executive Member",      department: "REVA Business School",               photo: null, bio: null, linkedin: null, instagram: null },
    { id: 27, name: "Pragathi N",             role: "Executive Member",      department: "School of EEE",                       photo: "Pragathi N.jpeg", bio: null, linkedin: null, instagram: null },
    { id: 28, name: "Aryan Nayyar",           role: "Executive Member",      department: "School of CSE",                       photo: "Aryan Nayyar.JPG", bio: null, linkedin: null, instagram: null },
    { id: 29, name: "Nandana Parvathy SS",    role: "Executive Member",      department: "Department of Psychology",            photo: "Nandhana Parvathy.JPG", bio: null, linkedin: null, instagram: null },
    { id: 30, name: "Purvik A Reddy",         role: "Executive Member",      department: "School of Architecture",              photo: "Purvik A Reddy.JPG", bio: null, linkedin: null, instagram: null },
    { id: 31, name: "Shrey S Nayak",          role: "Executive Member",      department: "School of Agricultural Engineering",  photo: "Shrey S Naik.JPG", bio: null, linkedin: null, instagram: null },
    { id: 32, name: "Tejashree R",            role: "Senior Mentor",         department: "School of CSE",                       photo: "Tejashree R.jpeg", bio: null, linkedin: null, instagram: null },
    { id: 33, name: "Brunda N",               role: "Senior Mentor",         department: "School of C&IT",                      photo: null, bio: null, linkedin: null, instagram: null },
    { id: 34, name: "Hyder Nawaz Khan",       role: "Senior Mentor",         department: "School of Management Studies",        photo: null, bio: null, linkedin: null, instagram: null },
    { id: 35, name: "D Naga Sumukh",          role: "Senior Mentor",         department: "School of CSE",                       photo: null, bio: null, linkedin: null, instagram: null },
    { id: 36, name: "K Sree Lakshmi",         role: "Senior Mentor",         department: "School of Applied Sciences",          photo: null, bio: null, linkedin: null, instagram: null },
    { id: 37, name: "Manavi",                 role: "Senior Mentor",         department: "School of Civil Engineering",         photo: null, bio: null, linkedin: null, instagram: null },
    { id: 38, name: "Prabhat Kumar",          role: "Senior Mentor",         department: "School of EEE",                       photo: null, bio: null, linkedin: null, instagram: null },
  ],
  foundation: [
    { id: 101, name: "Aarushi Verma",   role: "President",         department: "School of Computing",          photo: null, bio: null, linkedin: null, instagram: null },
    { id: 102, name: "Rohan Kumar",     role: "Vice President",    department: "School of Management",         photo: null, bio: null, linkedin: null, instagram: null },
    { id: 103, name: "Priya Gowda",    role: "General Secretary", department: "School of ECE",                photo: null, bio: null, linkedin: null, instagram: null },
    { id: 104, name: "Kiran Raj",      role: "Cultural Secretary",department: "School of Architecture",       photo: null, bio: null, linkedin: null, instagram: null },
    { id: 105, name: "Neha Singh",     role: "Sports Secretary",  department: "School of Legal Studies",      photo: null, bio: null, linkedin: null, instagram: null },
    { id: 106, name: "Aditya Mohan",   role: "Technical Head",    department: "School of CSA",                photo: null, bio: null, linkedin: null, instagram: null },
    { id: 107, name: "Sneha Reddy",    role: "Public Relations",  department: "School of Arts & Humanities",  photo: null, bio: null, linkedin: null, instagram: null },
    { id: 108, name: "Varun Desai",    role: "Treasurer",         department: "School of Commerce",           photo: null, bio: null, linkedin: null, instagram: null },
  ],
};

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
