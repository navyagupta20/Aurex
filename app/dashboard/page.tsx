"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
};

type DashboardStats = {
  sessionsCompleted: number;
  averageScore: number;
  communication: number;
  confidence: number;
  participation: number;
  leadership: number;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  const [stats, setStats] = useState<DashboardStats>({
    sessionsCompleted: 0,
    averageScore: 0,
    communication: 0,
    confidence: 0,
    participation: 0,
    leadership: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        /* ================= LOAD USER ================= */

        const userResponse = await fetch(
          "/api/auth/me",
          {
            cache: "no-store",
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();

          setUser(userData);
        }

        /* ================= LOAD STATS ================= */

        const statsResponse = await fetch(
          "/api/dashboard/stats",
          {
            cache: "no-store",
          }
        );

        if (statsResponse.ok) {
          const statsData =
            await statsResponse.json();

          setStats(statsData);
        } else {
          console.error(
            "Failed to load dashboard stats"
          );
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  /* ================= PERFORMANCE DATA ================= */

  const skills = [
    {
      name: "Communication",
      score: stats.communication,
    },
    {
      name: "Confidence",
      score: stats.confidence,
    },
    {
      name: "Participation",
      score: stats.participation,
    },
    {
      name: "Leadership",
      score: stats.leadership,
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
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Practice
            </Link>

            <Link
              href="/dashboard"
              className="text-[#8F2945]"
            >
              Dashboard
            </Link>

            <Link
              href="/about"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              About
            </Link>

          </div>

        </div>

      </nav>

      {/* ================= HEADER ================= */}

      <section className="border-b border-[#E5E5E5] bg-white">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8F2945]">
                Student Dashboard
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">

                {loading
                  ? "Welcome back"
                  : `Welcome back${
                      user?.name
                        ? `, ${user.name}`
                        : ""
                    }.`}

              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#6B6863]">
                Track your GD practice, resume strength
                and overall performance from one place.
              </p>

            </div>

            <Link
              href="/practice"
              className="w-fit rounded-lg bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]"
            >
              Start Practicing →
            </Link>

          </div>

        </div>

      </section>

      {/* ================= DASHBOARD ================= */}

      <section className="py-12 lg:py-16">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* ================= OVERVIEW ================= */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* GD SESSIONS */}

            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">
                GD Sessions
              </p>

              <p className="mt-3 text-4xl font-bold">
                {stats.sessionsCompleted}
              </p>

              <p className="mt-2 text-sm text-[#6B6863]">
                Sessions completed
              </p>

            </div>

            {/* AVERAGE SCORE */}

            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">
                Average Score
              </p>

              <p className="mt-3 text-4xl font-bold">
                {stats.sessionsCompleted > 0
                  ? stats.averageScore
                  : "—"}
              </p>

              <p className="mt-2 text-sm text-[#6B6863]">
                GD performance
              </p>

            </div>

            {/* ATS SCORE */}

            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">
                ATS Score
              </p>

              <p className="mt-3 text-4xl font-bold">
                0
              </p>

              <p className="mt-2 text-sm text-[#6B6863]">
                Resume analysis
              </p>

            </div>

            {/* PRACTICE LEVEL */}

            <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">
                Practice Level
              </p>

              <p className="mt-3 text-2xl font-bold">
                Beginner
              </p>

              <p className="mt-2 text-sm text-[#6B6863]">
                Current level
              </p>

            </div>

          </div>

          {/* ================= MAIN GRID ================= */}

          <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* ================= RESUME ================= */}

<div className="lg:col-span-2">

  <div className="rounded-2xl border border-[#E5E5E5] bg-white p-7">

    <div>

      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8F2945]">
        Resume
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        ATS Resume Score
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B6863]">
        Upload your resume and get an ATS
        score, keyword analysis and
        improvement suggestions.
      </p>

    </div>

    <div className="mt-7">

      <Link
        href="/practice/resume"
        className="inline-flex rounded-lg bg-[#8F2945] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#742138]"
      >
        Analyze Resume →
      </Link>

    </div>

  </div>

</div>

            {/* ================= QUICK ACTIONS ================= */}

            <div className="rounded-2xl border border-[#E5E5E5] bg-[#171717] p-7 text-white">

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A5A5A5]">
                Quick Actions
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Improve your performance.
              </h2>

              <div className="mt-7 space-y-3">

                <Link
                  href="/practice"
                  className="block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#8F2945] hover:text-white"
                >
                  Practice GD
                </Link>

                <Link
                  href="/practice/live-challenge"
                  className="block rounded-lg border border-[#444] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#8F2945] hover:bg-[#8F2945]"
                >
                  Join Live GD
                </Link>

              </div>

            </div>

          </div>

          {/* ================= PERFORMANCE ================= */}

          <div className="mt-8 rounded-2xl border border-[#E5E5E5] bg-white p-7">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8F2945]">
                Performance
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                GD Performance Analysis
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B6863]">
                After you complete GD sessions, Aurex
                will analyze your performance across
                important communication and reasoning
                skills.
              </p>

            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {skills.map((skill) => (

                <div
                  key={skill.name}
                  className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-5"
                >

                  <div className="flex items-center justify-between gap-2">

                    <p className="text-sm font-semibold">
                      {skill.name}
                    </p>

                    <p className="text-sm font-bold text-[#8F2945]">
                      {stats.sessionsCompleted > 0
                        ? `${skill.score}/100`
                        : "—"}
                    </p>

                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E5E5E5]">

                    <div
                      className="h-full rounded-full bg-[#8F2945] transition-all duration-500"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />

                  </div>

                  <p className="mt-2 text-xs text-[#999]">

                    {stats.sessionsCompleted > 0
                      ? "Current performance"
                      : "No data yet"}

                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* ================= RECENT SESSIONS ================= */}

          <div className="mt-8 rounded-2xl border border-[#E5E5E5] bg-white p-7">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8F2945]">
                  Activity
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Recent GD Sessions
                </h2>

              </div>

              <p className="text-sm text-[#999]">
                Your latest practice activity
              </p>

            </div>

            {stats.sessionsCompleted === 0 ? (

              <div className="mt-7 rounded-xl border border-dashed border-[#D8D8D8] bg-[#FAFAF9] py-12 text-center">

                <p className="text-lg font-semibold">
                  No GD sessions completed yet
                </p>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B6863]">
                  Complete your first GD session and
                  your results, score and analysis will
                  appear here.
                </p>

                <Link
                  href="/practice"
                  className="mt-5 inline-flex rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]"
                >
                  Start Your First GD →
                </Link>

              </div>

            ) : (

              <div className="mt-7 rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-6">

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="font-semibold">
                      GD Practice Completed
                    </p>

                    <p className="mt-1 text-sm text-[#6B6863]">
                      You have completed{" "}
                      {stats.sessionsCompleted}{" "}
                      GD session
                      {stats.sessionsCompleted !== 1
                        ? "s"
                        : ""}
                      .
                    </p>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-2xl font-bold text-[#8F2945]">
                      {stats.averageScore}/100
                    </p>

                    <p className="text-xs text-[#999]">
                      Average score
                    </p>

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