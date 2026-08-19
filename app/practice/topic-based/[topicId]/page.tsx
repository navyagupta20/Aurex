"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{
    topicId: string;
  }>;
};

type Topic = {
  id: string;
  title: string;
  description: string | null;
  level: string;
};

export default function TopicPage({ params }: Props) {
  const router = useRouter();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function loadTopic() {
      try {
        const resolvedParams = await params;

        const response = await fetch(
          `/api/topics/${resolvedParams.topicId}`
        );

        if (!response.ok) {
          throw new Error("Topic not found");
        }

        const data = await response.json();

        setTopic(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    }

    loadTopic();
  }, [params]);

  async function startGD() {
    if (!topic) {
      alert("Topic is still loading. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: topic.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create GD session");
      }

      const session = await response.json();

      router.push(`/practice/gd/${session.id}`);
    } catch (error) {
      console.error(error);
      alert("Unable to start GD session.");
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[#A6A6A6]">
            Loading topic...
          </p>
        </div>
      </main>
    );
  }

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold">
            Topic Not Found
          </h1>

          <p className="mt-4 text-[#A6A6A6]">
            We couldn't find this GD topic.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">

        {/* LEVEL */}

        <p className="text-sm font-semibold uppercase tracking-widest text-[#8F2945]">
          {topic.level} Practice
        </p>

        {/* TITLE */}

        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
          {topic.title}
        </h1>

        {/* DESCRIPTION */}

        {topic.description && (
          <p className="mt-6 text-lg leading-8 text-[#A6A6A6]">
            {topic.description}
          </p>
        )}

        {/* PREPARATION */}

        <div className="mt-12 rounded-2xl border border-[#242424] bg-[#101010] p-7">
          <p className="text-lg font-semibold">
            Before you begin
          </p>

          <p className="mt-3 text-sm leading-7 text-[#A6A6A6]">
            Prepare your arguments, examples and counterpoints.
            Once you start the GD, you will enter the live
            discussion room.
          </p>
        </div>

        {/* START BUTTON */}

        <button
          onClick={startGD}
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-[#8F2945] px-6 py-4 font-semibold text-white transition hover:bg-[#A83252] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Starting GD..." : "Start GD"}
        </button>

      </div>
    </main>
  );
}