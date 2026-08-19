"use client";

import { useEffect, useState } from "react";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

type Participant = {
  id: string;
  userId: string;
  name: string;
  joinedAt: string;
};

type Challenge = {
  challengeId: string;
  topicTitle: string;
  topicDescription: string | null;
  level: string;
  maxParticipants: number;
  status: string;
};

export default function GDSessionPage({ params }: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const [challenge, setChallenge] =
    useState<Challenge | null>(null);

  const [participants, setParticipants] =
    useState<Participant[]>([]);

  const [loading, setLoading] = useState(true);

  /* ================= GET SESSION ID ================= */

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setSessionId(resolvedParams.sessionId);
    }

    getParams();
  }, [params]);

  /* ================= LOAD CHALLENGE ================= */

  useEffect(() => {
    if (!sessionId) return;

    async function loadChallenge() {
      try {
        const response = await fetch(
          `/api/live-challenges/${sessionId}`
        );

        if (!response.ok) {
          throw new Error("Challenge not found");
        }

        const data = await response.json();

        setChallenge(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadChallenge();
  }, [sessionId]);

  /* ================= LOAD PARTICIPANTS ================= */

  useEffect(() => {
    if (!sessionId) return;

    async function loadParticipants() {
      try {
        const response = await fetch(
          `/api/live-challenges/${sessionId}/participants`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load participants"
          );
        }

        const data = await response.json();

        setParticipants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadParticipants();

    /* Check every 3 seconds */

    const interval = setInterval(
      loadParticipants,
      3000
    );

    return () => clearInterval(interval);
  }, [sessionId]);

  /* ================= LOADING ================= */

  if (loading || !challenge) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[#A6A6A6]">
            Loading live session...
          </p>

        </div>

      </main>
    );
  }

  /* ================= PAGE ================= */

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-white">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <p className="text-sm font-semibold uppercase tracking-widest text-[#8F2945]">
          {challenge.level} • Live GD
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          {challenge.topicTitle}
        </h1>

        {challenge.topicDescription && (
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#A6A6A6]">
            {challenge.topicDescription}
          </p>
        )}

        {/* INFORMATION */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* STATUS */}

          <div className="rounded-2xl border border-[#242424] bg-[#101010] p-6">

            <p className="text-sm text-[#666666]">
              Status
            </p>

            <p className="mt-2 text-2xl font-bold capitalize">
              {challenge.status}
            </p>

          </div>

          {/* PARTICIPANTS */}

          <div className="rounded-2xl border border-[#242424] bg-[#101010] p-6">

            <p className="text-sm text-[#666666]">
              Participants
            </p>

            <p className="mt-2 text-2xl font-bold">
              {participants.length} /{" "}
              {challenge.maxParticipants}
            </p>

          </div>

          {/* LEVEL */}

          <div className="rounded-2xl border border-[#242424] bg-[#101010] p-6">

            <p className="text-sm text-[#666666]">
              Level
            </p>

            <p className="mt-2 text-2xl font-bold">
              {challenge.level}
            </p>

          </div>

        </div>

        {/* PARTICIPANTS */}

        <div className="mt-8 rounded-2xl border border-[#242424] bg-[#101010] p-7">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Participants
            </h2>

            <span className="text-sm text-[#666666]">
              Updating automatically
            </span>

          </div>

          {participants.length === 0 ? (

            <p className="mt-6 text-[#666666]">
              Waiting for participants...
            </p>

          ) : (

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {participants.map((participant) => (

                <div
                  key={participant.id}
                  className="rounded-xl border border-[#242424] bg-[#0B0B0B] p-5"
                >

                  <p className="font-semibold">
                    {participant.name}
                  </p>

                  <p className="mt-1 text-sm text-[#666666]">
                    Participant
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* VIDEO ROOM */}

        <div className="mt-8 rounded-2xl border border-[#242424] bg-[#101010] p-8">

          <p className="text-sm uppercase tracking-widest text-[#666666]">
            Live Room
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Video Discussion Room
          </h2>

          <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-[#333333] bg-[#080808]">

            <p className="text-center text-[#666666]">
              Video call will be connected here next.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}