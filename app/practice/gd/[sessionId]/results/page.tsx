"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Result = {
  sessionId: string;
  userId: string;

  overallScore: number;

  communicationScore: number;
  contentScore: number;
  confidenceScore: number;
  relevanceScore: number;
  participationScore: number;
  leadershipScore: number;

  strengths: string | null;
  improvements: string | null;
  analysis: string | null;

  createdAt: string;
};

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default function GDResultsPage({
  params,
}: Props) {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD RESULT ================= */

  useEffect(() => {
    async function loadResult() {
      try {
        const resolvedParams = await params;

        const response = await fetch(
          `/api/sessions/${resolvedParams.sessionId}/result`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Result not found");
        }

        const data: Result = await response.json();

        setResult(data);
      } catch (error) {
        console.error("Error loading result:", error);
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, [params]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF9] px-6 py-16 text-[#171717]">
        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E5E5E5] border-t-[#8F2945]" />

          <p className="mt-4 text-sm text-[#777]">
            Loading your GD results...
          </p>

        </div>
      </main>
    );
  }

  /* ================= RESULT NOT FOUND ================= */

  if (!result) {
    return (
      <main className="min-h-screen bg-[#FAFAF9] px-6 py-16 text-[#171717]">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8F2945]">
            Aurex
          </p>

          <h1 className="mt-4 text-3xl font-bold">
            Results not available
          </h1>

          <p className="mt-4 text-[#6B6863]">
            Your GD result has not been generated yet.
          </p>

          <Link
            href="/practice"
            className="mt-8 inline-block rounded-xl bg-[#8F2945] px-6 py-3 font-semibold text-white transition hover:bg-[#762139]"
          >
            Back to Practice
          </Link>

        </div>

      </main>
    );
  }

  /* ================= SCORE DATA ================= */

  const scoreItems = [
    {
      name: "Communication",
      score: result.communicationScore,
    },
    {
      name: "Content",
      score: result.contentScore,
    },
    {
      name: "Confidence",
      score: result.confidenceScore,
    },
    {
      name: "Relevance",
      score: result.relevanceScore,
    },
    {
      name: "Participation",
      score: result.participationScore,
    },
    {
      name: "Leadership",
      score: result.leadershipScore,
    },
  ];

  /* ================= PAGE ================= */

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8F2945] text-sm font-bold text-white">
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


          {/* NAVIGATION */}

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">

            <Link
              href="/"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Home
            </Link>

            <Link
              href="/practice"
              className="text-[#6B6863] transition hover:text-[#8F2945]"
            >
              Practice
            </Link>

            <Link
              href="/dashboard"
              className="text-[#6B6863] transition hover:text-[#8F2945]"
            >
              Dashboard
            </Link>

            <Link
              href="/about"
              className="text-[#6B6863] transition hover:text-[#8F2945]"
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


      {/* ================= RESULTS HEADER ================= */}

      <section className="relative overflow-hidden bg-white">

        {/* DECORATIVE CIRCLES */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#8F2945]/10" />

        <div className="pointer-events-none absolute -right-8 top-20 h-44 w-44 rounded-full bg-[#8F2945]/5" />

        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full border border-[#8F2945]/10" />


        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-10 lg:px-10 lg:pb-12 lg:pt-12">

          <div className="mx-auto max-w-5xl text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
              Aurex · GD Results
            </p>

            <h1 className="mt-2 text-4xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">
              Your GD Performance
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6B6863]">
              Here's how you performed in your group discussion.
            </p>

          </div>

        </div>

      </section>


      {/* ================= RESULTS CONTENT ================= */}

      <section className="bg-[#FAFAF9] py-10 lg:py-12">

        <div className="mx-auto max-w-5xl px-6 lg:px-10">


          {/* ================= OVERALL SCORE ================= */}

          <div className="mx-auto max-w-3xl rounded-2xl border border-[#E7D2D8] bg-[#FFF4F6] p-7 text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
              Overall Score
            </p>

            <div className="mt-2 text-6xl font-bold tracking-tight text-[#8F2945]">
              {result.overallScore}
            </div>

            <p className="mt-1 text-sm text-[#8A777D]">
              out of 100
            </p>

          </div>


          {/* ================= PERFORMANCE BREAKDOWN ================= */}

          <div className="mt-7 rounded-2xl border border-[#E2E2E2] bg-white p-7">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
              Performance
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Performance Breakdown
            </h2>


            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {scoreItems.map((item) => (

                <div
                  key={item.name}
                  className="rounded-xl border border-[#E2E2E2] bg-[#FCFAF7] p-5"
                >

                  <div className="flex items-center justify-between">

                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="font-bold text-[#8F2945]">
                      {item.score}/100
                    </p>

                  </div>


                  {/* PROGRESS BAR */}

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8E3DE]">

                    <div
                      className="h-full rounded-full bg-[#8F2945]"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* ================= STRENGTHS + IMPROVEMENTS ================= */}

          <div className="mt-7 grid gap-5 md:grid-cols-2">


            {/* STRENGTHS */}

            <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                Strengths
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                What you did well
              </h2>

              <p className="mt-4 leading-7 text-[#6F6A65]">
                {result.strengths ||
                  "Your strengths will appear here after analysis."}
              </p>

            </div>


            {/* IMPROVEMENTS */}

            <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                Improvements
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Areas to improve
              </h2>

              <p className="mt-4 leading-7 text-[#6F6A65]">
                {result.improvements ||
                  "Improvement suggestions will appear here after analysis."}
              </p>

            </div>

          </div>


          {/* ================= ANALYSIS ================= */}

          <div className="mt-7 rounded-2xl border border-[#E2E2E2] bg-white p-7">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
              Analysis
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Overall Feedback
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-[#6F6A65]">
              {result.analysis ||
                "Detailed GD analysis will appear here."}
            </p>

          </div>


          {/* ================= ACTION BUTTONS ================= */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">

            <Link
              href="/practice"
              className="rounded-xl bg-[#8F2945] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#762139]"
            >
              Practice Again
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-[#E2E2E2] bg-white px-7 py-3 text-center font-semibold text-[#171717] transition hover:border-[#8F2945] hover:text-[#8F2945]"
            >
              Dashboard
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
            Group Discussion practice, built better.
          </p>

        </div>

      </footer>

    </main>
  );
}