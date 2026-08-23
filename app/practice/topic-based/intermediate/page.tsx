"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Topic = {
  id: string;
  title: string;
  description: string | null;
  level: string;
};

export default function IntermediateTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopics() {
      try {
        const response = await fetch(
          "/api/topics?level=Intermediate",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch intermediate topics");
        }

        const data = await response.json();

        setTopics(data);
      } catch (error) {
        console.error("Error loading intermediate topics:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTopics();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF9] text-[#171717]">
        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E5E5E5] border-t-[#8F2945]" />

          <p className="mt-4 text-sm text-[#777]">
            Loading topics...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-white">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -right-2 top-28 h-44 w-44 rounded-full border border-[#E7E7E7]" />

        <div className="pointer-events-none absolute left-[-100px] top-52 h-64 w-64 rounded-full bg-[#8F2945]/5" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-24">

          <div className="max-w-4xl">

            {/* Label */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Aurex · Intermediate GD
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

              Strengthen your{" "}

              <span className="text-[#8F2945]">
                thinking
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">
              Develop stronger reasoning with topics that
              challenge your perspective, structure your ideas,
              and improve your communication.
            </p>

          </div>

        </div>

      </section>


      {/* ================= TOPICS ================= */}

      <section className="bg-[#FAFAF9] py-16 lg:py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* SECTION HEADER */}

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                Intermediate Level
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                Choose a topic
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B6863]">
                Practice opinion-based and analytical topics
                that require clear reasoning and structured arguments.
              </p>

            </div>

            <Link
              href="/practice/topic-based"
              className="text-sm font-semibold text-[#8F2945] transition hover:text-[#171717]"
            >
              Change Level →
            </Link>

          </div>


          {/* ================= EMPTY STATE ================= */}

          {topics.length === 0 && (
            <div className="mt-10 rounded-2xl border border-[#E2E2E2] bg-white p-10 text-center">

              <p className="text-lg font-semibold">
                No topics available yet.
              </p>

              <p className="mt-2 text-sm text-[#777]">
                New intermediate GD topics will appear here soon.
              </p>

            </div>
          )}


          {/* ================= TOPIC CARDS ================= */}

          {topics.length > 0 && (

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {topics.slice(0, 6).map((topic, index) => (

                <article
                  key={topic.id}
                  className="group flex min-h-[280px] flex-col rounded-2xl border border-[#E2E2E2] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
                >

                  {/* TOP */}

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-bold text-[#B5B5B5]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                      Intermediate
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="mt-8">

                    <h3 className="text-2xl font-bold leading-snug tracking-[-0.02em]">
                      {topic.title}
                    </h3>

                    {topic.description && (
                      <p className="mt-4 max-w-lg text-sm leading-6 text-[#777]">
                        {topic.description}
                      </p>
                    )}

                  </div>


                  {/* BOTTOM */}

                  <div className="mt-auto border-t border-[#EEEEEE] pt-5">

                    <Link
                      href={`/practice/topic-based/${topic.id}`}
                      className="flex items-center justify-between text-sm font-semibold text-[#171717]"
                    >

                      <span>
                        Practice This Topic
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCDCDC] text-sm transition group-hover:border-[#8F2945] group-hover:bg-[#8F2945] group-hover:text-white">
                        →
                      </span>

                    </Link>

                  </div>

                </article>

              ))}

            </div>

          )}

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