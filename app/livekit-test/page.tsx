"use client";

import { useEffect, useState } from "react";
import LiveKitMeeting from "@/components/LiveKitRoom";

type Topic = {
  title: string;
  description: string | null;
  level: string;
};

export default function LiveKitTestPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const topic: Topic = {
    title: "Is Artificial Intelligence a Threat to Jobs?",
    description:
      "Discuss whether AI will create more opportunities than it replaces.",
    level: "Intermediate",
  };

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch("/api/livekit/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: "aurex-test-room",
            participantName: "Test Student",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.error || "Failed to connect to LiveKit."
          );
          return;
        }

        setToken(data.token);
      } catch (error) {
        console.error("LIVEKIT CONNECTION ERROR:", error);

        setError(
          "Unable to connect to the meeting."
        );
      }
    }

    getToken();
  }, []);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-[#292929] bg-[#151515] p-8 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8F2945]/10 text-[#C56A85]">
            !
          </div>

          <h1 className="mt-5 text-lg font-semibold">
            Meeting unavailable
          </h1>

          <p className="mt-2 text-sm text-[#666]">
            {error}
          </p>

        </div>
      </main>
    );
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">

        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#333] border-t-[#8F2945]" />

          <p className="mt-4 text-sm text-[#777]">
            Connecting to Aurex GD...
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <LiveKitMeeting
        token={token}
        serverUrl={
          process.env.NEXT_PUBLIC_LIVEKIT_URL || ""
        }
        topic={topic}
      />
    </main>
  );
}