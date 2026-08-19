"use client";

import { useEffect, useState } from "react";

type Topic = {
  id: string;
  title: string;
  description: string | null;
  level: string;
  createdAt: string;
};

export default function BeginnerTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("/api/topics?level=Beginner");

        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8F2945]">
            Topic-Based Practice
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Beginner Topics
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#A6A6A6]">
            Start with familiar topics and build your confidence
            before moving to more challenging discussions.
          </p>
        </div>

        {loading ? (
          <p className="mt-16 text-center text-[#A6A6A6]">
            Loading topics...
          </p>
        ) : topics.length === 0 ? (
          <p className="mt-16 text-center text-[#A6A6A6]">
            No beginner topics available yet.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-2xl border border-[#242424] bg-[#101010] p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8F2945]">
                  Beginner
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  {topic.title}
                </h2>

                {topic.description && (
                  <p className="mt-4 leading-7 text-[#A6A6A6]">
                    {topic.description}
                  </p>
                )}

                <a
                  href={`/practice/topic-based/${topic.id}`}
                  className="mt-7 inline-block rounded-lg bg-[#8F2945] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#A83252]"
                >
                  Practice This Topic
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}