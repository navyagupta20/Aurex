"use client";

import { useState } from "react";
import Link from "next/link";

type AnalysisResult = {
  success: boolean;
  score: number;
  wordCount: number;
  foundKeywords: string[];
  missingKeywords: string[];
  sections: {
    skills: boolean;
    education: boolean;
    experience: boolean;
    projects: boolean;
    achievements: boolean;
  };
  strengths: string[];
  suggestions: string[];
};

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] =
    useState<AnalysisResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeResume() {
    if (!file) {
      setError("Please select your resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("resume", file);

      const response = await fetch(
        "/api/resume/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to analyze resume."
        );
      }

      setResult(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (
      !allowedTypes.includes(
        selectedFile.type
      )
    ) {
      setError(
        "Please upload a PDF or DOCX file."
      );

      setFile(null);
      return;
    }

    setError("");
    setResult(null);
    setFile(selectedFile);
  }

  const sectionList = [
    {
      name: "Skills",
      value: result?.sections.skills,
    },
    {
      name: "Education",
      value: result?.sections.education,
    },
    {
      name: "Experience",
      value: result?.sections.experience,
    },
    {
      name: "Projects",
      value: result?.sections.projects,
    },
    {
      name: "Achievements",
      value: result?.sections.achievements,
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#171717] text-sm font-bold text-white">
              A
            </div>

            <div>

              <p className="text-lg font-bold tracking-tight">
                Aurex
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8F2945]">
                Practice. Prepare. Compete.
              </p>

            </div>

          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">

            <Link
              href="/"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Home
            </Link>

            <Link
              href="/practice"
              className="text-[#171717]"
            >
              Practice
            </Link>

            <Link
              href="/practice/live-challenge"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Live GD
            </Link>

            <Link
              href="/about"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              About
            </Link>

            <Link
              href="/signin"
              className="rounded-lg bg-[#171717] px-5 py-2.5 text-white transition hover:bg-[#8F2945]"
            >
              Sign In
            </Link>

          </div>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-white">

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -right-2 top-28 h-44 w-44 rounded-full border border-[#E7E7E7]" />

        <div className="pointer-events-none absolute left-[-100px] top-40 h-64 w-64 rounded-full bg-[#8F2945]/5" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-24">

          <div className="max-w-3xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Resume Analyzer
              </span>

            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl">

              Check your

              <span className="text-[#8F2945]">
                {" "}ATS Score.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">
              Upload your resume and get an instant
              ATS-focused analysis of your skills,
              sections, keywords and resume structure.
            </p>

          </div>

        </div>

      </section>

      {/* ================= UPLOAD ================= */}

      <section className="bg-[#FAFAF9] py-16 lg:py-20">

        <div className="mx-auto max-w-5xl px-6 lg:px-10">

          <div className="flex items-center gap-4">

            <div className="h-px flex-1 bg-[#E2E2E2]" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#999]">
              Resume Analysis
            </p>

            <div className="h-px flex-1 bg-[#E2E2E2]" />

          </div>

          <div className="mt-8 rounded-2xl border border-[#E2E2E2] bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.05)] md:p-9">

            {!result && (
              <>
                <div className="rounded-2xl border-2 border-dashed border-[#DCDCDC] bg-[#FAFAF9] p-10 text-center transition hover:border-[#8F2945]">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8F2945]/10">

                    <svg
                      className="h-7 w-7 text-[#8F2945]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 16V4m0 0L8 8m4-4 4 4M5 20h14"
                      />
                    </svg>

                  </div>

                  <h2 className="mt-5 text-xl font-bold">
                    Upload your resume
                  </h2>

                  <p className="mt-2 text-sm text-[#6B6863]">
                    PDF or DOCX files only
                  </p>

                  <label className="mt-6 inline-block cursor-pointer rounded-lg bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]">

                    Choose Resume

                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                  </label>

                  {file && (
                    <div className="mx-auto mt-6 max-w-md rounded-xl border border-[#E5E5E5] bg-white p-4 text-left">

                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">
                        Selected File
                      </p>

                      <p className="mt-2 truncate text-sm font-semibold">
                        {file.name}
                      </p>

                    </div>
                  )}

                </div>

                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  onClick={analyzeResume}
                  disabled={!file || loading}
                  className="mt-6 w-full rounded-lg bg-[#8F2945] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#742138] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Analyzing Resume..."
                    : "Analyze Resume →"}
                </button>
              </>
            )}

            {/* ================= RESULTS ================= */}

            {result && (
              <div>

                <div className="flex flex-col justify-between gap-5 border-b border-[#EEEEEE] pb-7 sm:flex-row sm:items-center">

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8F2945]">
                      Analysis Complete
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
                      Your ATS Results
                    </h2>

                  </div>

                  <button
                    onClick={() => {
                      setResult(null);
                      setFile(null);
                    }}
                    className="rounded-lg border border-[#DCDCDC] px-5 py-2.5 text-sm font-semibold transition hover:border-[#8F2945] hover:text-[#8F2945]"
                  >
                    Analyze Another
                  </button>

                </div>

                {/* SCORE */}

                <div className="mt-8 grid gap-5 md:grid-cols-3">

                  <div className="rounded-2xl bg-[#171717] p-7 text-white md:col-span-1">

                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A5A5A5]">
                      ATS Score
                    </p>

                    <p className="mt-4 text-6xl font-bold">
                      {result.score}
                      <span className="text-2xl text-[#A5A5A5]">
                        /100
                      </span>
                    </p>

                    <p className="mt-3 text-sm text-[#A5A5A5]">
                      Based on resume structure,
                      keywords and content.
                    </p>

                  </div>

                  <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF9] p-7">

                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999]">
                      Resume Words
                    </p>

                    <p className="mt-4 text-4xl font-bold">
                      {result.wordCount}
                    </p>

                    <p className="mt-2 text-sm text-[#6B6863]">
                      Words detected in your resume.
                    </p>

                  </div>

                  <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF9] p-7">

                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999]">
                      Keywords
                    </p>

                    <p className="mt-4 text-4xl font-bold">
                      {result.foundKeywords.length}
                    </p>

                    <p className="mt-2 text-sm text-[#6B6863]">
                      Relevant skills detected.
                    </p>

                  </div>

                </div>

                {/* SECTIONS */}

                <div className="mt-6 rounded-2xl border border-[#E5E5E5] bg-white p-7">

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8F2945]">
                    Resume Sections
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

                    {sectionList.map(
                      (section) => (
                        <div
                          key={section.name}
                          className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-4"
                        >

                          <div className="flex items-center justify-between">

                            <p className="text-sm font-semibold">
                              {section.name}
                            </p>

                            <span
                              className={
                                section.value
                                  ? "text-[#8F2945]"
                                  : "text-[#999]"
                              }
                            >
                              {section.value
                                ? "✓"
                                : "—"}
                            </span>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* STRENGTHS + SUGGESTIONS */}

                <div className="mt-6 grid gap-6 md:grid-cols-2">

                  <div className="rounded-2xl border border-[#E5E5E5] bg-white p-7">

                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8F2945]">
                      Strengths
                    </p>

                    <div className="mt-5 space-y-4">

                      {result.strengths.map(
                        (strength, index) => (
                          <div
                            key={index}
                            className="flex gap-3"
                          >

                            <span className="mt-0.5 text-[#8F2945]">
                              ✓
                            </span>

                            <p className="text-sm leading-6 text-[#6B6863]">
                              {strength}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  <div className="rounded-2xl border border-[#E5E5E5] bg-white p-7">

                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8F2945]">
                      Improve Your Resume
                    </p>

                    <div className="mt-5 space-y-4">

                      {result.suggestions.map(
                        (suggestion, index) => (
                          <div
                            key={index}
                            className="flex gap-3"
                          >

                            <span className="mt-0.5 text-[#8F2945]">
                              →
                            </span>

                            <p className="text-sm leading-6 text-[#6B6863]">
                              {suggestion}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>

                {/* KEYWORDS */}

                <div className="mt-6 rounded-2xl border border-[#E5E5E5] bg-white p-7">

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8F2945]">
                    Detected Skills
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {result.foundKeywords.length > 0 ? (
                      result.foundKeywords.map(
                        (keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full bg-[#8F2945]/8 px-3 py-1.5 text-xs font-semibold capitalize text-[#8F2945]"
                          >
                            {keyword}
                          </span>
                        )
                      )
                    ) : (
                      <p className="text-sm text-[#6B6863]">
                        No predefined technical
                        keywords were detected.
                      </p>
                    )}

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <div>

            <p className="font-bold">
              Aurex
            </p>

            <p className="mt-1 text-xs text-[#999]">
              Practice. Prepare. Compete.
            </p>

          </div>

          <p className="text-xs text-[#999]">
            Placement preparation, built better.
          </p>

        </div>

      </footer>

    </main>
  );
}