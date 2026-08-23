import "dotenv/config";

import { db } from "../lib/db";
import { topics } from "../lib/db/schema";

const topicsData = [
  // ================= BEGINNER =================

  {
    title: "Is Social Media Good or Bad?",
    description:
      "Discuss the positive and negative effects of social media.",
    level: "Beginner",
  },
  {
    title: "Should Students Use Smartphones in College?",
    description:
      "Discuss whether smartphones help or distract students in college.",
    level: "Beginner",
  },
  {
    title: "Online Classes vs Offline Classes",
    description:
      "Compare online and traditional classroom education.",
    level: "Beginner",
  },
  {
    title: "Should College Students Have Part-Time Jobs?",
    description:
      "Discuss the benefits and challenges of students working part-time.",
    level: "Beginner",
  },
  {
    title: "Is Teamwork Better Than Individual Work?",
    description:
      "Discuss whether working in a team is better than working alone.",
    level: "Beginner",
  },
  {
    title: "Should Students Get More Holidays?",
    description:
      "Discuss whether more holidays would improve student life and productivity.",
    level: "Beginner",
  },

  // ================= INTERMEDIATE =================

  {
    title: "Is Artificial Intelligence a Threat to Jobs?",
    description:
      "Discuss how AI may affect employment and future careers.",
    level: "Intermediate",
  },
  {
    title: "Work From Home vs Work From Office",
    description:
      "Compare productivity, collaboration, and work-life balance.",
    level: "Intermediate",
  },
  {
    title: "Should Companies Prioritize Skills Over Degrees?",
    description:
      "Discuss whether practical skills should matter more than academic qualifications.",
    level: "Intermediate",
  },
  {
    title: "Is Social Media Influencing Young People Too Much?",
    description:
      "Discuss the influence of social media on opinions, lifestyle, and decisions.",
    level: "Intermediate",
  },
  {
    title: "Should College Education Be Completely Free?",
    description:
      "Discuss the advantages and challenges of free higher education.",
    level: "Intermediate",
  },
  {
    title: "Does Technology Make People Less Social?",
    description:
      "Discuss whether technology is improving or weakening human interaction.",
    level: "Intermediate",
  },

  // ================= ADVANCED =================

  {
    title: "Can AI Replace Human Creativity?",
    description:
      "Discuss whether artificial intelligence can genuinely replace human creativity.",
    level: "Advanced",
  },
  {
    title: "Should Governments Regulate Artificial Intelligence?",
    description:
      "Discuss the need for government regulation of AI development and deployment.",
    level: "Advanced",
  },
  {
    title: "Is Economic Growth More Important Than Environmental Protection?",
    description:
      "Discuss the balance between economic development and environmental sustainability.",
    level: "Advanced",
  },
  {
    title: "Should Companies Monitor Employee Productivity?",
    description:
      "Discuss employee monitoring, privacy, productivity, and workplace trust.",
    level: "Advanced",
  },
  {
    title: "Will Automation Increase or Reduce Economic Inequality?",
    description:
      "Analyze how automation could affect different sections of society.",
    level: "Advanced",
  },
  {
    title: "Should Social Media Platforms Be Responsible for Misinformation?",
    description:
      "Discuss the responsibility of technology companies in controlling misinformation.",
    level: "Advanced",
  },
];

async function seedTopics() {
  try {
    await db.insert(topics).values(topicsData);

    console.log("18 topics inserted successfully.");
  } catch (error) {
    console.error("Error inserting topics:", error);
  }

  process.exit(0);
}

seedTopics();