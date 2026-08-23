import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { extractText } from "unpdf";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Please upload a resume.",
        },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();

    const isPDF =
      file.type === "application/pdf" ||
      fileName.endsWith(".pdf");

    const isDOCX =
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx");

    if (!isPDF && !isDOCX) {
      return NextResponse.json(
        {
          error: "Only PDF and DOCX files are supported.",
        },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    let text = "";

    /* ================= PDF ================= */

    if (isPDF) {
      const { text: pages } = await extractText(
        new Uint8Array(buffer)
      );

      text = Array.isArray(pages)
        ? pages.join(" ")
        : String(pages);
    }

    /* ================= DOCX ================= */

    if (isDOCX) {
      const result = await mammoth.extractRawText({
        buffer: Buffer.from(buffer),
      });

      text = result.value;
    }

    /* ================= CLEAN TEXT ================= */

    text = text
      .replace(/\s+/g, " ")
      .trim();

    if (!text) {
      return NextResponse.json(
        {
          error:
            "The resume was uploaded, but no readable text could be extracted.",
        },
        { status: 400 }
      );
    }

    /* ================= KEYWORDS ================= */

    const keywords = [
      "c++",
      "java",
      "python",
      "javascript",
      "typescript",
      "react",
      "next.js",
      "node.js",
      "sql",
      "postgresql",
      "mongodb",
      "html",
      "css",
      "tailwind",
      "git",
      "github",
      "docker",
      "aws",
      "azure",
      "machine learning",
      "deep learning",
      "data analysis",
      "data analytics",
      "power bi",
      "tableau",
      "pandas",
      "numpy",
      "matplotlib",
      "scikit-learn",
      "tensorflow",
      "django",
      "rest api",
      "api",
      "dsa",
      "data structures",
      "algorithms",
      "oop",
    ];

    const resumeText = text.toLowerCase();

    const foundKeywords = keywords.filter(
      (keyword) =>
        resumeText.includes(keyword.toLowerCase())
    );

    const missingKeywords = keywords.filter(
      (keyword) =>
        !resumeText.includes(keyword.toLowerCase())
    );

    /* ================= SECTIONS ================= */

    const sections = {
      skills:
        /skills|technical skills|technologies/i.test(text),

      education:
        /education|academic/i.test(text),

      experience:
        /experience|internship|work experience|employment/i.test(
          text
        ),

      projects:
        /projects|project experience/i.test(text),

      achievements:
        /achievements|certifications|awards/i.test(text),
    };

    /* ================= SECTION SCORE ================= */

    const sectionScore =
      Object.values(sections).filter(Boolean).length * 8;

    /* ================= KEYWORD SCORE ================= */

    const keywordScore = Math.min(
      40,
      Math.round(
        (foundKeywords.length / keywords.length) * 40
      )
    );

    /* ================= LENGTH SCORE ================= */

    const wordCount = text.split(/\s+/).length;

    let lengthScore = 0;

    if (wordCount >= 250 && wordCount <= 900) {
      lengthScore = 20;
    } else if (
      wordCount >= 150 &&
      wordCount <= 1100
    ) {
      lengthScore = 15;
    } else {
      lengthScore = 8;
    }

    /* ================= FINAL SCORE ================= */

    const score = Math.min(
      100,
      keywordScore +
        sectionScore +
        lengthScore
    );

    /* ================= STRENGTHS ================= */

    const strengths: string[] = [];

    if (foundKeywords.length >= 10) {
      strengths.push(
        "Good technical keyword coverage."
      );
    }

    if (sections.skills) {
      strengths.push("Skills section detected.");
    }

    if (sections.projects) {
      strengths.push("Projects section detected.");
    }

    if (sections.education) {
      strengths.push("Education section detected.");
    }

    if (sections.experience) {
      strengths.push(
        "Experience or internship section detected."
      );
    }

    if (strengths.length === 0) {
      strengths.push(
        "Resume text was successfully extracted."
      );
    }

    /* ================= SUGGESTIONS ================= */

    const suggestions: string[] = [];

    if (!sections.skills) {
      suggestions.push(
        "Add a clear Skills section."
      );
    }

    if (!sections.projects) {
      suggestions.push(
        "Add relevant projects with technologies used."
      );
    }

    if (!sections.experience) {
      suggestions.push(
        "Add internship, work, or practical experience if applicable."
      );
    }

    if (!sections.achievements) {
      suggestions.push(
        "Add achievements, certifications, or relevant accomplishments."
      );
    }

    if (missingKeywords.length > 0) {
      suggestions.push(
        `Consider adding relevant skills such as ${missingKeywords
          .slice(0, 8)
          .join(", ")} if you genuinely have them.`
      );
    }

    if (wordCount < 150) {
      suggestions.push(
        "Your resume appears too short. Add more relevant detail."
      );
    }

    if (wordCount > 1100) {
      suggestions.push(
        "Your resume may be too long. Remove unnecessary information."
      );
    }

    /* ================= RESPONSE ================= */

    return NextResponse.json({
      success: true,
      score,
      wordCount,
      foundKeywords,
      missingKeywords: missingKeywords.slice(0, 20),
      sections,
      strengths,
      suggestions,
    });
  } catch (error) {
    console.error(
      "RESUME ANALYSIS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to analyze resume.",
      },
      { status: 500 }
    );
  }
}