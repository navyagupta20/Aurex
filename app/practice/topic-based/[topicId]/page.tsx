"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Topic = {
  id: string;
  title: string;
  description: string | null;
  level: string;
};

export default function TopicPage() {
  const router = useRouter();
  const params = useParams();

  const topicId = params.topicId as string;

  const [topic, setTopic] = useState<Topic | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  /* ================= LOAD TOPIC ================= */

  useEffect(() => {
    if (!topicId) return;

    async function loadTopic() {
      try {
        setPageLoading(true);

        const response = await fetch(`/api/topics/${topicId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Topic not found");
        }

        const data = await response.json();

        setTopic(data);
      } catch (error) {
        console.error("TOPIC LOAD ERROR:", error);
        setTopic(null);
      } finally {
        setPageLoading(false);
      }
    }

    loadTopic();
  }, [topicId]);

  /* ================= START GD ================= */

  async function startGD() {
    if (!topic) return;

    try {
      setStarting(true);

      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: topic.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create session");
      }

      router.push(`/practice/gd/${data.id}`);
    } catch (error) {
      console.error("START GD ERROR:", error);

      alert("Unable to start GD session.");

      setStarting(false);
    }
  }

  /* ================= LOADING ================= */

  if (pageLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-6 text-[#171717]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#E5E5E5] border-t-[#8F2945]" />

          <p className="mt-5 text-sm font-medium text-[#6B6863]">
            Loading topic...
          </p>
        </div>
      </main>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!topic) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF9] px-6 text-[#171717]">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8F2945]/8">
            <span className="text-xl font-bold text-[#8F2945]">!</span>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
            Aurex
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Topic Not Found
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#6B6863]">
            We couldn't find this discussion topic. Please go back and
            select another topic.
          </p>

          <button
            onClick={() => router.push("/practice/topic-based")}
            className="mt-7 rounded-lg bg-[#8F2945] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#742138]"
          >
            Back to Topics
          </button>
        </div>
      </main>
    );
  }

  /* ================= PAGE ================= */

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
              className="text-[#8F2945]"
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

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -right-2 top-28 h-44 w-44 rounded-full border border-[#E7E7E7]" />

        <div className="pointer-events-none absolute left-[-100px] top-40 h-64 w-64 rounded-full bg-[#8F2945]/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">

          {/* ================= HERO TOP BAR ================= */}

          <div className="mb-7 flex items-center justify-between">

            {/* BACK TO HOME */}

            <button
              onClick={() => router.push("/")}
              className="text-sm font-medium text-[#777] transition hover:text-[#8F2945]"
            >
              ← Back to Home
            </button>

            {/* AUREX GD */}

            <p className="text-sm font-bold tracking-tight text-[#8F2945]">
              Aurex · GD
            </p>

          </div>


          {/* ================= CENTERED HERO ================= */}

          <div className="mx-auto max-w-4xl text-center">

            {/* LABEL */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Aurex · {topic.level} GD
              </span>

            </div>


            {/* TITLE */}

            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {topic.title}
            </h1>


            {/* DESCRIPTION */}

            {topic.description && (
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">
                {topic.description}
              </p>
            )}

          </div>
        </div>
      </section>


      {/* ================= PREPARATION ================= */}

      <section className="bg-[#FAFAF9] py-12 lg:py-16">

        <div className="mx-auto max-w-5xl px-6 lg:px-10">

          {/* SECTION LABEL */}

          <div className="flex items-center gap-4">

            <div className="h-px flex-1 bg-[#E2E2E2]" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#999]">
              Preparation
            </p>

            <div className="h-px flex-1 bg-[#E2E2E2]" />

          </div>


          {/* MAIN CARD */}

          <div className="mt-7 rounded-2xl border border-[#E2E2E2] bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.05)] md:p-9">

            <div className="text-center">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                Before you compete
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Prepare for the discussion
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6F6A65]">
                Take a moment to understand the topic and think about
                the points you want to bring into the discussion.
                Focus on clear, structured and meaningful ideas.
              </p>

            </div>


            {/* ================= PREPARATION CARDS ================= */}

            <div className="mt-7 grid gap-4 md:grid-cols-3">

              {/* CARD 1 */}

              <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-5 text-center transition hover:-translate-y-1 hover:border-[#C9AAB4] hover:shadow-md">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#8F2945]/10 text-sm font-bold text-[#8F2945]">
                  01
                </div>

                <p className="mt-4 text-sm font-bold">
                  Understand
                </p>

                <p className="mt-2 text-xs leading-5 text-[#777]">
                  Identify what the topic is really asking.
                </p>

              </div>


              {/* CARD 2 */}

              <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-5 text-center transition hover:-translate-y-1 hover:border-[#C9AAB4] hover:shadow-md">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#8F2945]/10 text-sm font-bold text-[#8F2945]">
                  02
                </div>

                <p className="mt-4 text-sm font-bold">
                  Build
                </p>

                <p className="mt-2 text-xs leading-5 text-[#777]">
                  Think of arguments, examples and viewpoints.
                </p>

              </div>


              {/* CARD 3 */}

              <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-5 text-center transition hover:-translate-y-1 hover:border-[#C9AAB4] hover:shadow-md">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#8F2945]/10 text-sm font-bold text-[#8F2945]">
                  03
                </div>

                <p className="mt-4 text-sm font-bold">
                  Respond
                </p>

                <p className="mt-2 text-xs leading-5 text-[#777]">
                  Be ready to agree, disagree or build on ideas.
                </p>

              </div>

            </div>

          </div>


          {/* ================= TIME INFORMATION ================= */}

          <div className="mx-auto mt-5 max-w-4xl rounded-2xl border border-[#E7D2D8] bg-[#FDF7F9] p-6 text-center">

            <p className="text-sm font-semibold text-[#8F2945]">
              2 minutes to prepare yourself
            </p>

            <p className="mt-2 text-sm text-[#6F6A65]">
              After that, your 15-minute GD will start.
            </p>

          </div>


          {/* ================= START BUTTON ================= */}

          <div className="mx-auto mt-6 max-w-4xl">

            <button
              onClick={startGD}
              disabled={starting}
              className="w-full rounded-lg bg-[#8F2945] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#742138] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {starting ? "Starting GD..." : "Start GD →"}
            </button>

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