"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function IntermediateSession() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const challengeId = searchParams.get("challengeId");

  const [joining, setJoining] = useState(false);

  async function joinSession() {
    if (!challengeId) {
      alert("Challenge not found.");
      return;
    }

    setJoining(true);

    try {
      // Temporary test user
      const userId = "1cdf19aa-f9c1-4ca9-a2b4-ad9e8e797d24";

      const response = await fetch(
        `/api/live-challenges/${challengeId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (
          data.error ===
          "User already joined this challenge"
        ) {
          router.push(
            `/practice/gd/${challengeId}`
          );
          return;
        }

        throw new Error(
          data.error || "Failed to join session"
        );
      }

      router.push(`/practice/gd/${challengeId}`);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to join session."
      );

      setJoining(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Live Challenge • Intermediate
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Ready to Join?
          </h1>

          <p className="mt-5 leading-7 text-slate-400">
            You are about to enter a live group discussion
            with other students.
          </p>

        </div>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold">
            Before You Join
          </h2>

          <div className="mt-6 space-y-4 text-slate-400">

            <p>
              <span className="font-semibold text-white">
                Level:
              </span>{" "}
              Intermediate
            </p>

            <p>
              <span className="font-semibold text-white">
                Participants:
              </span>{" "}
              Maximum 8
            </p>

            <p>
              <span className="font-semibold text-white">
                Discussion:
              </span>{" "}
              Live Group Discussion
            </p>

          </div>

          <button
            onClick={joinSession}
            disabled={joining}
            className="mt-8 w-full rounded-lg bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {joining
              ? "Joining Session..."
              : "Join Live Session"}
          </button>

        </div>

      </div>
    </main>
  );
}