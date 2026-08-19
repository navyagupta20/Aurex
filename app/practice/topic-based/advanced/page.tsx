"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Topic = {
  id: string;
  title: string;
  description: string | null;
  level: string;
};

export default function AdvancedTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await fetch("/api/topics");

        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await response.json();

        const advancedTopics = data.filter(
          (topic: Topic) => topic.level === "Advanced"
        );

        setTopics(advancedTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Topic-Based Practice
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Advanced Topics
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Challenge yourself with complex placement-level
            topics requiring strong reasoning and critical thinking.
          </p>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="mt-12 text-center text-slate-400">
            Loading topics...
          </div>
        )}

        {/* TOPICS */}

        {!loading && topics.length > 0 && (
          <div className="mt-12 grid gap-6">

            {topics.map((topic, index) => (
              <div
                key={topic.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-7"
              >
                <p className="text-sm text-slate-500">
                  Topic {(index + 1).toString().padStart(2, "0")}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {topic.title}
                </h2>

                {topic.description && (
                  <p className="mt-4 text-slate-400">
                    {topic.description}
                  </p>
                )}

                <Link
                  href={`/practice/topic-based/${topic.id}`}
                  className="mt-6 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  View Topic
                </Link>
              </div>
            ))}

          </div>
        )}

        {/* NO TOPICS */}

        {!loading && topics.length === 0 && (
          <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-slate-400">
              No advanced topics found.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}