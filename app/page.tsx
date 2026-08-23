"use client";

import Link from "next/link";

export default function Home() {
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
              className="text-[#8F2945]"
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
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Dashboard
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

        <div className="pointer-events-none absolute left-[-100px] top-52 h-64 w-64 rounded-full bg-[#8F2945]/5" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">

          <div className="max-w-4xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Placement Preparation Platform
              </span>

            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

              Practice how you{" "}

              <span className="text-[#8F2945]">
                think,
              </span>

              <br />

              speak and{" "}

              <span className="italic">
                compete.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">
              Build confidence through realistic group discussion
              practice designed for college placements,
              interviews and competitive discussions.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                href="/practice"
                className="rounded-lg bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]"
              >
                Start Practicing
              </Link>

            </div>

          </div>


          {/* ================= STATS ================= */}

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


      {/* ================= PRACTICE ================= */}

      <section className="bg-[#FAFAF9] py-16 lg:py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                Practice Center
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
                Build your confidence.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B6863]">
                Choose how you want to practice your group discussion skills.
              </p>

            </div>

            <Link
              href="/practice"
              className="text-sm font-semibold text-[#8F2945] transition hover:text-[#171717]"
            >
              Open Practice Center →
            </Link>

          </div>


          {/* ================= PRACTICE OPTIONS ================= */}

          <div className="mt-10 grid gap-5 md:grid-cols-2">


            {/* ================= TOPIC-BASED GD ================= */}

            <article className="group rounded-2xl border border-[#E2E2E2] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">

              <span className="text-xs font-bold text-[#B5B5B5]">
                01
              </span>

              <div className="mt-8">

                <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                  Practice
                </span>

                <h3 className="mt-5 text-2xl font-bold leading-snug">
                  Topic-Based GD
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-[#777]">
                  Practice GD topics at different difficulty levels
                  and improve your ability to structure and present
                  your arguments.
                </p>

              </div>

              <div className="mt-8 border-t border-[#EEEEEE] pt-5">

                <Link
                  href="/practice/topic-based"
                  className="text-xs font-semibold text-[#8F2945] transition hover:text-[#171717]"
                >
                  Explore Topics →
                </Link>

              </div>

            </article>


            {/* ================= LIVE CHALLENGE ================= */}

            <article className="group rounded-2xl border border-[#E2E2E2] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">

              <span className="text-xs font-bold text-[#B5B5B5]">
                02
              </span>

              <div className="mt-8">

                <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                  Real-Time
                </span>

                <h3 className="mt-5 text-2xl font-bold leading-snug">
                  Live Challenge
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-[#777]">
                  Join a real-time group discussion with other
                  students and experience a realistic 15-minute
                  GD environment.
                </p>

              </div>

              <div className="mt-8 border-t border-[#EEEEEE] pt-5">

                <Link
                  href="/practice/live-challenge"
                  className="text-xs font-semibold text-[#8F2945] transition hover:text-[#171717]"
                >
                  Join Live Challenge →
                </Link>

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* ================= PLACEMENT JOURNEY ================= */}

      <section className="bg-[#171717] text-white">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A9D]">
                Placement Journey
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                Prepare with purpose. Perform with confidence.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#A5A5A5]">
                Practice GDs, strengthen your communication skills,
                improve your resume and track your progress as you
                prepare for placements.
              </p>

            </div>

            
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