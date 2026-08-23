import { db } from "./index";
import { topics } from "./schema";

const gdTopics = [
  // =========================
  // BEGINNER — 30 TOPICS
  // =========================

  {
    title: "Should Students Use Smartphones in College?",
    description: "Discuss the benefits and disadvantages of smartphones for college students.",
    level: "beginner",
  },
  {
    title: "Online Education vs Offline Education",
    description: "Which mode of education is more effective for students?",
    level: "beginner",
  },
  {
    title: "Social Media: Boon or Curse?",
    description: "Discuss the positive and negative impact of social media.",
    level: "beginner",
  },
  {
    title: "Should College Attendance Be Mandatory?",
    description: "Discuss whether mandatory attendance is necessary in colleges.",
    level: "beginner",
  },
  {
    title: "Importance of Communication Skills",
    description: "Discuss why communication skills are important for students and professionals.",
    level: "beginner",
  },
  {
    title: "Work From Home vs Work From Office",
    description: "Discuss which working model is better for employees and companies.",
    level: "beginner",
  },
  {
    title: "Should Students Do Internships During College?",
    description: "Discuss the importance of internships for college students.",
    level: "beginner",
  },
  {
    title: "Is Technology Making Life Easier?",
    description: "Discuss whether technology has improved everyday life.",
    level: "beginner",
  },
  {
    title: "Books vs Digital Content",
    description: "Discuss whether physical books are still relevant.",
    level: "beginner",
  },
  {
    title: "Importance of Time Management",
    description: "Discuss why time management is important for students.",
    level: "beginner",
  },
  {
    title: "Should College Students Have Part-Time Jobs?",
    description: "Discuss the advantages and disadvantages of part-time jobs.",
    level: "beginner",
  },
  {
    title: "Is Competition Good for Students?",
    description: "Discuss whether competition improves student performance.",
    level: "beginner",
  },
  {
    title: "Teamwork vs Individual Work",
    description: "Discuss which approach is better for achieving goals.",
    level: "beginner",
  },
  {
    title: "Importance of Physical Fitness",
    description: "Discuss the role of physical fitness in student life.",
    level: "beginner",
  },
  {
    title: "Should Exams Be Replaced by Continuous Assessment?",
    description: "Discuss different methods of evaluating students.",
    level: "beginner",
  },
  {
    title: "Is English Necessary for Career Success?",
    description: "Discuss the importance of English communication in professional life.",
    level: "beginner",
  },
  {
    title: "Should Students Learn Coding?",
    description: "Discuss whether coding should be a compulsory skill.",
    level: "beginner",
  },
  {
    title: "Importance of Hobbies in Student Life",
    description: "Discuss whether students should spend time developing hobbies.",
    level: "beginner",
  },
  {
    title: "Is Hostel Life Better Than Living at Home?",
    description: "Discuss the advantages and disadvantages of hostel life.",
    level: "beginner",
  },
  {
    title: "Should College Students Travel More?",
    description: "Discuss whether travelling provides valuable learning experiences.",
    level: "beginner",
  },
  {
    title: "Is Artificial Intelligence Helpful for Students?",
    description: "Discuss the benefits and drawbacks of AI in education.",
    level: "beginner",
  },
  {
    title: "Should Students Use AI for Assignments?",
    description: "Discuss whether AI tools should be allowed for academic work.",
    level: "beginner",
  },
  {
    title: "Importance of Soft Skills",
    description: "Discuss why soft skills matter alongside technical knowledge.",
    level: "beginner",
  },
  {
    title: "Should College Education Be Free?",
    description: "Discuss the advantages and challenges of free higher education.",
    level: "beginner",
  },
  {
    title: "Is Social Media Affecting Student Focus?",
    description: "Discuss whether excessive social media use affects concentration.",
    level: "beginner",
  },
  {
    title: "Should Students Participate in Extracurricular Activities?",
    description: "Discuss the importance of activities outside academics.",
    level: "beginner",
  },
  {
    title: "Online Shopping vs Offline Shopping",
    description: "Discuss which shopping experience is better.",
    level: "beginner",
  },
  {
    title: "Is Digital Payment Better Than Cash?",
    description: "Discuss the advantages and disadvantages of digital payments.",
    level: "beginner",
  },
  {
    title: "Importance of Public Speaking",
    description: "Discuss why public speaking is an important professional skill.",
    level: "beginner",
  },
  {
    title: "Is Failure Necessary for Success?",
    description: "Discuss whether failure plays an important role in personal growth.",
    level: "beginner",
  },

  // =========================
  // INTERMEDIATE — 30 TOPICS
  // =========================

  {
    title: "Is Artificial Intelligence a Threat to Jobs?",
    description: "Discuss whether AI will replace jobs or create new opportunities.",
    level: "intermediate",
  },
  {
    title: "Should India Focus More on Manufacturing?",
    description: "Discuss the importance of manufacturing for India's economic growth.",
    level: "intermediate",
  },
  {
    title: "Is Remote Work Sustainable for Companies?",
    description: "Discuss the long-term impact of remote working.",
    level: "intermediate",
  },
  {
    title: "Should Companies Hire Based on Skills Instead of Degrees?",
    description: "Discuss whether skills should matter more than academic qualifications.",
    level: "intermediate",
  },
  {
    title: "Is the Gig Economy Good for Workers?",
    description: "Discuss the opportunities and challenges of gig-based employment.",
    level: "intermediate",
  },
  {
    title: "Should India Adopt a Four-Day Work Week?",
    description: "Discuss the potential benefits and challenges of shorter work weeks.",
    level: "intermediate",
  },
  {
    title: "Is Data the New Oil?",
    description: "Discuss the economic and strategic importance of data.",
    level: "intermediate",
  },
  {
    title: "Should AI Regulation Be Mandatory?",
    description: "Discuss whether governments should regulate artificial intelligence.",
    level: "intermediate",
  },
  {
    title: "Digital Privacy vs National Security",
    description: "Discuss the balance between privacy and national security.",
    level: "intermediate",
  },
  {
    title: "Is Cashless India Possible?",
    description: "Discuss India's transition toward digital payments.",
    level: "intermediate",
  },
  {
    title: "Should Social Media Platforms Be Regulated?",
    description: "Discuss whether governments should regulate social media companies.",
    level: "intermediate",
  },
  {
    title: "Economic Growth vs Environmental Protection",
    description: "Discuss the balance between development and environmental protection.",
    level: "intermediate",
  },
  {
    title: "Should India Increase Investment in Renewable Energy?",
    description: "Discuss India's transition toward renewable energy.",
    level: "intermediate",
  },
  {
    title: "Is Electric Mobility the Future?",
    description: "Discuss the opportunities and challenges of electric vehicles.",
    level: "intermediate",
  },
  {
    title: "Should Startups Prioritize Profit Over Growth?",
    description: "Discuss different approaches to building sustainable startups.",
    level: "intermediate",
  },
  {
    title: "Is Online Banking Completely Safe?",
    description: "Discuss cybersecurity risks associated with digital banking.",
    level: "intermediate",
  },
  {
    title: "Should Companies Monitor Employee Productivity?",
    description: "Discuss employee privacy versus workplace productivity.",
    level: "intermediate",
  },
  {
    title: "Is Globalization Beneficial for Developing Countries?",
    description: "Discuss the economic and social effects of globalization.",
    level: "intermediate",
  },
  {
    title: "Should India Invest More in Space Technology?",
    description: "Discuss the economic and strategic importance of space research.",
    level: "intermediate",
  },
  {
    title: "Is Entrepreneurship Better Than a Traditional Job?",
    description: "Compare entrepreneurship with conventional employment.",
    level: "intermediate",
  },
  {
    title: "Should Companies Allow Employees to Work From Anywhere?",
    description: "Discuss location-independent work.",
    level: "intermediate",
  },
  {
    title: "Is AI Making Students Less Creative?",
    description: "Discuss the impact of AI tools on creativity and independent thinking.",
    level: "intermediate",
  },
  {
    title: "Should Governments Provide Universal Basic Income?",
    description: "Discuss the potential benefits and risks of universal basic income.",
    level: "intermediate",
  },
  {
    title: "Is India's Education System Ready for the Future?",
    description: "Discuss the strengths and weaknesses of India's education system.",
    level: "intermediate",
  },
  {
    title: "Should Companies Prioritize Employee Wellbeing?",
    description: "Discuss the responsibility of companies toward employee wellbeing.",
    level: "intermediate",
  },
  {
    title: "Is Cryptocurrency the Future of Money?",
    description: "Discuss the potential and risks of cryptocurrencies.",
    level: "intermediate",
  },
  {
    title: "Should Internet Access Be a Basic Right?",
    description: "Discuss the importance of internet access in modern society.",
    level: "intermediate",
  },
  {
    title: "Is Automation Good for Economic Growth?",
    description: "Discuss how automation affects productivity and employment.",
    level: "intermediate",
  },
  {
    title: "Should Companies Be Responsible for Climate Change?",
    description: "Discuss corporate responsibility toward environmental sustainability.",
    level: "intermediate",
  },
  {
    title: "Is Digital Education Creating a Digital Divide?",
    description: "Discuss unequal access to technology and education.",
    level: "intermediate",
  },

  // =========================
  // ADVANCED — 30 TOPICS
  // =========================

  {
    title: "AI Regulation: Innovation vs Control",
    description: "Discuss how governments can regulate AI without slowing innovation.",
    level: "advanced",
  },
  {
    title: "Should India Prioritize Economic Growth Over Climate Targets?",
    description: "Discuss India's development needs versus climate commitments.",
    level: "advanced",
  },
  {
    title: "Is Universal Digital Identity a Threat to Privacy?",
    description: "Discuss digital identity systems and individual privacy.",
    level: "advanced",
  },
  {
    title: "Can India Become a Global Technology Superpower?",
    description: "Discuss India's strengths and challenges in becoming a technology leader.",
    level: "advanced",
  },
  {
    title: "Is Geopolitics Becoming More Important Than Economics?",
    description: "Discuss the relationship between global politics and trade.",
    level: "advanced",
  },
  {
    title: "Should Critical Technologies Be Open Source?",
    description: "Discuss the benefits and risks of open access to advanced technologies.",
    level: "advanced",
  },
  {
    title: "Can Artificial Intelligence Be Truly Ethical?",
    description: "Discuss the challenges of building ethical AI systems.",
    level: "advanced",
  },
  {
    title: "Should Governments Control Big Technology Companies?",
    description: "Discuss competition, innovation and regulation of large technology firms.",
    level: "advanced",
  },
  {
    title: "Is Technological Progress Increasing Inequality?",
    description: "Discuss whether technology benefits all sections of society equally.",
    level: "advanced",
  },
  {
    title: "Should Countries Become Self-Reliant in Critical Technology?",
    description: "Discuss technological sovereignty and global cooperation.",
    level: "advanced",
  },
  {
    title: "Can Economic Development and Environmental Sustainability Coexist?",
    description: "Discuss whether sustainable development is realistically achievable.",
    level: "advanced",
  },
  {
    title: "Is the Future of Work Human-AI Collaboration?",
    description: "Discuss how AI may transform the relationship between humans and work.",
    level: "advanced",
  },
  {
    title: "Should AI-Generated Content Be Legally Protected?",
    description: "Discuss copyright and ownership issues surrounding AI-generated content.",
    level: "advanced",
  },
  {
    title: "Is Digital Surveillance Justified for Public Safety?",
    description: "Discuss surveillance versus civil liberties.",
    level: "advanced",
  },
  {
    title: "Should Governments Regulate Algorithmic Recommendations?",
    description: "Discuss the social impact of recommendation algorithms.",
    level: "advanced",
  },
  {
    title: "Is Technological Sovereignty Necessary for National Security?",
    description: "Discuss the strategic importance of domestic technology capabilities.",
    level: "advanced",
  },
  {
    title: "Can Renewable Energy Completely Replace Fossil Fuels?",
    description: "Discuss the technological and economic challenges of the energy transition.",
    level: "advanced",
  },
  {
    title: "Should Companies Be Legally Responsible for AI Decisions?",
    description: "Discuss accountability when automated systems cause harm.",
    level: "advanced",
  },
  {
    title: "Is Data Ownership the Next Major Economic Debate?",
    description: "Discuss who should control and benefit from personal and commercial data.",
    level: "advanced",
  },
  {
    title: "Should AI Development Have Global Safety Standards?",
    description: "Discuss international cooperation on advanced AI safety.",
    level: "advanced",
  },
  {
    title: "Can Democracy Survive the Age of Deepfakes?",
    description: "Discuss misinformation, synthetic media and democratic institutions.",
    level: "advanced",
  },
  {
    title: "Is Globalization Reversing?",
    description: "Discuss whether countries are moving toward regionalization and self-reliance.",
    level: "advanced",
  },
  {
    title: "Should Governments Tax Automation?",
    description: "Discuss whether automated businesses should face additional taxation.",
    level: "advanced",
  },
  {
    title: "Can AI Replace Human Decision-Making in Government?",
    description: "Discuss the opportunities and risks of AI-assisted governance.",
    level: "advanced",
  },
  {
    title: "Should There Be Limits on Artificial General Intelligence?",
    description: "Discuss whether advanced AI development should have strict boundaries.",
    level: "advanced",
  },
  {
    title: "Is Privacy Possible in the Digital Age?",
    description: "Discuss whether individuals can realistically maintain privacy online.",
    level: "advanced",
  },
  {
    title: "Should Technology Companies Have More Power Than Governments?",
    description: "Discuss the growing influence of global technology companies.",
    level: "advanced",
  },
  {
    title: "Can India Balance Digital Growth With Data Sovereignty?",
    description: "Discuss India's digital expansion and control over data.",
    level: "advanced",
  },
  {
    title: "Should Climate Responsibility Be Shared Equally Among Countries?",
    description: "Discuss fairness in global climate responsibility.",
    level: "advanced",
  },
  {
    title: "Is Human Creativity Still Unique in the Age of AI?",
    description: "Discuss whether AI changes our understanding of human creativity.",
    level: "advanced",
  },
];

async function seedTopics() {
  console.log("Starting GD topic seeding...");

  await db.insert(topics).values(gdTopics);

  console.log(
    `Successfully inserted ${gdTopics.length} GD topics.`
  );

  process.exit(0);
}

seedTopics().catch((error) => {
  console.error("Failed to seed GD topics:");
  console.error(error);

  process.exit(1);
});