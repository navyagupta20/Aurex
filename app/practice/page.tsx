"use client";

import Link from "next/link";
import { useState } from "react";

const topics = {
  Beginner: [
    {
      title: "Should Students Use Smartphones in College?",
      description:
        "Explore whether smartphones help students learn or distract them.",
      time: "15 min",
    },
    {
      title: "Online Education vs Offline Education",
      description:
        "Discuss which learning environment is more effective for students.",
      time: "15 min",
    },
    {
      title: "Should College Attendance Be Mandatory?",
      description:
        "Discuss freedom, discipline, learning outcomes and responsibility.",
      time: "15 min",
    },
    {
      title: "Social Media: Boon or Curse?",
      description:
        "Understand the positive and negative effects of social media.",
      time: "15 min",
    },
    {
      title: "Is Competition Good for Students?",
      description:
        "Discuss how competition affects motivation and performance.",
      time: "15 min",
    },
    {
      title: "Should Students Have Part-Time Jobs?",
      description:
        "Balance academics, experience, independence and time management.",
      time: "15 min",
    },
  ],

  Intermediate: [
    {
      title: "Impact of Artificial Intelligence",
      description:
        "Discuss the benefits, challenges and future impact of AI.",
      time: "15 min",
    },
    {
      title: "Will AI Replace Human Jobs?",
      description:
        "Explore automation, creativity, employment and human skills.",
      time: "15 min",
    },
    {
      title: "Work From Home vs Office",
      description:
        "Compare productivity, collaboration, flexibility and work culture.",
      time: "15 min",
    },
    {
      title: "Electric Vehicles: Future or Challenge?",
      description:
        "Discuss sustainability, infrastructure, cost and adoption.",
      time: "15 min",
    },
    {
      title: "Skills vs Degrees",
      description:
        "Should companies prioritize practical skills over academic degrees?",
      time: "15 min",
    },
    {
      title: "Is Social Media Changing Society?",
      description:
        "Discuss influence, communication, misinformation and culture.",
      time: "15 min",
    },
  ],

  Advanced: [
    {
      title: "AI and the Future of Employment",
      description:
        "Analyze how AI could reshape industries and the global workforce.",
      time: "15 min",
    },
    {
      title: "Privacy vs National Security",
      description:
        "Explore the difficult balance between individual privacy and security.",
      time: "15 min",
    },
    {
      title: "Can Technology Solve Climate Change?",
      description:
        "Discuss innovation, policy, responsibility and environmental limits.",
      time: "15 min",
    },
    {
      title: "Universal Basic Income",
      description:
        "Debate economic security, employment and government responsibility.",
      time: "15 min",
    },
    {
      title: "Globalization: Opportunity or Threat?",
      description:
        "Examine trade, jobs, culture and economic inequality.",
      time: "15 min",
    },
    {
      title: "Human Intelligence vs Artificial Intelligence",
      description:
        "Compare reasoning, creativity, adaptability and machine intelligence.",
      time: "15 min",
    },
  ],
};

type Level = keyof typeof topics;

export default function PracticePage() {
  const [activeLevel, setActiveLevel] =
    useState<Level>("Beginner");

  const currentTopics = topics[activeLevel];

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="flex items-center gap-3">

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
              className="text-[#8F2945]"
            >
              Practice
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

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -right-2 top-28 h-44 w-44 rounded-full border border-[#E7E7E7]" />

        <div className="pointer-events-none absolute left-[-100px] top-52 h-64 w-64 rounded-full bg-[#8F2945]/5" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-28">

          <div className="max-w-4xl">

            {/* Label */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Aurex Practice Center
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

              Practice how you
              <span className="text-[#8F2945]">
                {" "}think,
              </span>

              <br />

              speak and
              <span className="italic">
                {" "}compete.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">

              Build confidence through realistic group discussion
              topics designed for college placements, interviews
              and competitive discussions.

            </p>

            {/* Buttons */}

            <div className="mt-9 flex flex-wrap gap-3">

              <a
                href="#topics"
                className="rounded-lg bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]"
              >
                Explore Topics
              </a>

              <Link
                href="/practice/live-challenge"
                className="rounded-lg border border-[#DCDCDC] bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition hover:border-[#8F2945] hover:text-[#8F2945]"
              >
                Join Live GD
              </Link>

            </div>

          </div>

          {/* Stats */}

          <div className="mt-16 grid max-w-2xl grid-cols-3 border-t border-[#E5E5E5] pt-6">

            <div>

              <p className="text-2xl font-bold">
                18+
              </p>

              <p className="mt-1 text-xs text-[#888]">
                GD Topics
              </p>

            </div>

            <div className="border-l border-[#E5E5E5] pl-6">

              <p className="text-2xl font-bold">
                3
              </p>

              <p className="mt-1 text-xs text-[#888]">
                Difficulty Levels
              </p>

            </div>

            <div className="border-l border-[#E5E5E5] pl-6">

              <p className="text-2xl font-bold">
                15
              </p>

              <p className="mt-1 text-xs text-[#888]">
                Min Live GD
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= TOPICS ================= */}

      <section
        id="topics"
        className="bg-[#FAFAF9] py-16 lg:py-20"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Header */}

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                Topic Library
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
                Choose your challenge.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B6863]">
                Start at your level and gradually move toward
                more complex discussions.
              </p>

            </div>

            {/* Difficulty tabs */}

            <div className="flex rounded-xl border border-[#DEDEDE] bg-white p-1">

              {(Object.keys(topics) as Level[]).map(
                (level) => (

                  <button
                    key={level}
                    onClick={() =>
                      setActiveLevel(level)
                    }
                    className={`rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                      activeLevel === level
                        ? "bg-[#171717] text-white"
                        : "text-[#777] hover:text-[#171717]"
                    }`}
                  >
                    {level}
                  </button>

                )
              )}

            </div>

          </div>

          {/* Divider */}

          <div className="mt-12 flex items-center gap-4">

            <div className="h-px flex-1 bg-[#E2E2E2]" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#999]">
              {activeLevel} · {currentTopics.length} Topics
            </p>

            <div className="h-px flex-1 bg-[#E2E2E2]" />

          </div>

          {/* Topic cards */}

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {currentTopics.map(
              (topic, index) => (

                <article
                  key={topic.title}
                  className="group flex min-h-[280px] flex-col rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
                >

                  {/* Top */}

                  <div className="flex items-start justify-between">

                    <span className="text-xs font-bold text-[#B5B5B5]">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                      {activeLevel}
                    </span>

                  </div>

                  {/* Topic */}

                  <div className="mt-9">

                    <h3 className="text-xl font-bold leading-snug tracking-[-0.02em]">
                      {topic.title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-[#777]">
                      {topic.description}
                    </p>

                  </div>

                  {/* Bottom */}

                  <div className="mt-auto flex items-center justify-between border-t border-[#EEEEEE] pt-5">

                    <span className="text-xs font-medium text-[#999]">
                      {topic.time}
                    </span>

                    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCDCDC] text-sm transition group-hover:border-[#8F2945] group-hover:bg-[#8F2945] group-hover:text-white">
                      →
                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bg-[#171717] text-white">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A9D]">
                Ready to compete?
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                Take your practice into a real-time GD.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#A5A5A5]">
                Join other students, discuss a topic and
                experience a realistic group discussion.
              </p>

            </div>

            <Link
              href="/practice/live-challenge"
              className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-[#171717] transition hover:bg-[#8F2945] hover:text-white"
            >
              Enter Live GD →
            </Link>

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