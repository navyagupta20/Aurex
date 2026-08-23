"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LiveKitMeeting from "@/components/LiveKitRoom";

type Props = {
  params: Promise<{
    challengeId: string;
  }>;
};

type Challenge = {
  challengeId: string;
  topicId: string;
  topicTitle: string;
  topicDescription: string | null;
  level: string;
  maxParticipants: number;
  status: string;
  scheduledAt: string | null;
  createdAt: string;
};

type Message = {
  id: string;
  userId: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function LiveChallengeSession({
  params,
}: Props) {
  const router = useRouter();

  const [challengeId, setChallengeId] = useState("");
  const [challenge, setChallenge] =
    useState<Challenge | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [message, setMessage] = useState("");

  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ONLY ONE TIMER
  const [timeLeft, setTimeLeft] =
    useState(2 * 60);

  const [finished, setFinished] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [finishing, setFinishing] =
    useState(false);

  /* ================= GET CHALLENGE ID ================= */

  useEffect(() => {
    async function getParams() {
      try {
        const resolvedParams = await params;

        const id =
          resolvedParams.challengeId;

        if (!id) {
          setError(
            "Challenge ID is missing."
          );
          setLoading(false);
          return;
        }

        setChallengeId(id);
      } catch (error) {
        console.error(
          "PARAM ERROR:",
          error
        );

        setError(
          "Invalid challenge URL."
        );

        setLoading(false);
      }
    }

    getParams();
  }, [params]);

  /* ================= LOAD CHALLENGE ================= */

  useEffect(() => {
    if (!challengeId) return;

    async function loadChallenge() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/live-challenges/${challengeId}`,
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Challenge not found."
          );
        }

        setChallenge(data);
        setError("");
      } catch (error) {
        console.error(
          "CHALLENGE LOAD ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load challenge."
        );
      } finally {
        setLoading(false);
      }
    }

    loadChallenge();
  }, [challengeId]);

  /* ================= LOAD CHAT ================= */

  useEffect(() => {
    if (!challengeId) return;

    async function loadMessages() {
      try {
        const response = await fetch(
          `/api/live-challenges/${challengeId}/messages`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) return;

        const data =
          await response.json();

        setMessages(data);
      } catch (error) {
        console.error(
          "MESSAGE LOAD ERROR:",
          error
        );
      }
    }

    loadMessages();

    const interval = setInterval(
      loadMessages,
      2000
    );

    return () =>
      clearInterval(interval);
  }, [challengeId]);

  /* ================= LIVEKIT TOKEN ================= */

  useEffect(() => {
    if (!challengeId) return;

    async function connectToLiveKit() {
      try {
        const roomName =
          `aurex-gd-${challengeId}`;

        const participantName =
          "Student";

        const response = await fetch(
          "/api/livekit/token",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              roomName,
              participantName,
            }),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to connect to LiveKit."
          );
        }

        if (!data.token) {
          throw new Error(
            "LiveKit token was not returned."
          );
        }

        setToken(data.token);
      } catch (error) {
        console.error(
          "LIVEKIT ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to connect to the GD meeting."
        );
      }
    }

    connectToLiveKit();
  }, [challengeId]);

  /* ================= 2 MINUTE TIMER ================= */

  useEffect(() => {
    if (!challenge) return;
    if (finished) return;

    const interval =
      setInterval(() => {
        setTimeLeft((current) => {
          if (current <= 1) {
            setFinished(true);
            return 0;
          }

          return current - 1;
        });
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [challenge, finished]);

  /* ================= FORMAT TIMER ================= */

  function formatTime(
    seconds: number
  ) {
    const minutes =
      Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  }

  /* ================= SEND MESSAGE ================= */

  async function sendMessage() {
    if (!challengeId) return;
    if (!message.trim()) return;
    if (finished) return;

    try {
      setSending(true);

      const userResponse =
        await fetch("/api/auth/me", {
          cache: "no-store",
        });

      if (!userResponse.ok) {
        alert("Please sign in first.");
        return;
      }

      const user =
        await userResponse.json();

      const response = await fetch(
        `/api/live-challenges/${challengeId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            name:
              user.name || "Student",
            message:
              message.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Unable to send message."
        );
        return;
      }

      setMessages((current) => [
        ...current,
        data,
      ]);

      setMessage("");
    } catch (error) {
      console.error(
        "SEND MESSAGE ERROR:",
        error
      );

      alert(
        "Something went wrong while sending the message."
      );
    } finally {
      setSending(false);
    }
  }

  /* ================= FINISH GD ================= */

  async function finishGD() {
    if (!challenge) return;
    if (finishing) return;

    try {
      setFinishing(true);

      /* ================= GET USER ================= */

      const userResponse =
        await fetch("/api/auth/me", {
          cache: "no-store",
        });

      if (!userResponse.ok) {
        alert(
          "Please sign in before finishing the GD."
        );

        router.push("/signin");
        return;
      }

      const user =
        await userResponse.json();

      /* ================= CREATE SESSION ================= */

      const sessionResponse =
        await fetch("/api/sessions", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            topicId:
              challenge.topicId,
          }),
        });

      const sessionData =
        await sessionResponse.json();

      if (!sessionResponse.ok) {
        throw new Error(
          sessionData.error ||
            "Unable to create GD session."
        );
      }

      const sessionId =
        sessionData.id ||
        sessionData.sessionId;

      if (!sessionId) {
        throw new Error(
          "Session ID was not returned."
        );
      }

      /* ================= SAVE RESULT ================= */

      const resultResponse =
        await fetch(
          `/api/sessions/${sessionId}/result`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId: user.id,

              communicationScore: 0,
              contentScore: 0,
              confidenceScore: 0,
              relevanceScore: 0,
              participationScore: 0,
              leadershipScore: 0,

              strengths:
                "Your GD session has been successfully completed.",

              improvements:
                "Detailed improvement suggestions will be generated after performance analysis is added.",

              analysis:
                "Your GD session was successfully recorded. Detailed AI-based performance analysis will be added next.",
            }),
          }
        );

      const resultData =
        await resultResponse.json();

      if (!resultResponse.ok) {
        throw new Error(
          resultData.error ||
            "Unable to save GD result."
        );
      }

      /* ================= GO TO EXISTING RESULT PAGE ================= */

      router.push(
        `/practice/gd/${sessionId}/results`
      );
    } catch (error) {
      console.error(
        "FINISH GD ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to finish GD."
      );
    } finally {
      setFinishing(false);
    }
  }

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">

        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#333] border-t-[#8F2945]" />

          <p className="mt-4 text-sm text-[#777]">
            Connecting to your GD...
          </p>

        </div>

      </main>
    );
  }

  /* ================= ERROR ================= */

  if (
    error ||
    !challenge ||
    !token
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-6 text-white">

        <div className="w-full max-w-md rounded-2xl border border-[#292929] bg-[#151515] p-8 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8F2945]/10 text-[#C56A85]">
            !
          </div>

          <h1 className="mt-5 text-2xl font-semibold">
            Meeting unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#777]">
            {error ||
              "Unable to start the GD meeting."}
          </p>

          <button
            onClick={() =>
              router.push(
                "/practice/live-challenge"
              )
            }
            className="mt-6 rounded-lg bg-[#8F2945] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#762139]"
          >
            Back to Live GD
          </button>

        </div>

      </main>
    );
  }

  /* ================= SESSION ================= */

  return (
    <main className="min-h-screen bg-[#070707] text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-30 border-b border-[#222] bg-[#0d0d0d]/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8F2945] text-sm font-bold">
              A
            </div>

            <div>

              <p className="text-sm font-semibold">
                Aurex
              </p>

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">
                {challenge.level} · Live GD
              </p>

            </div>

          </div>

          {/* CENTER */}

          <div className="hidden max-w-xl flex-1 text-center md:block">

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8F2945]">
              Discussion Topic
            </p>

            <p className="mt-1 truncate text-sm font-semibold">
              {challenge.topicTitle}
            </p>

          </div>

          {/* ONLY TIMER */}

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">

              <span
                className={`h-2 w-2 rounded-full ${
                  finished
                    ? "bg-[#555]"
                    : "bg-[#8F2945]"
                }`}
              />

              <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-[#777] sm:block">
                {finished
                  ? "Ended"
                  : "Thinking"}
              </span>

            </div>

            <div className="rounded-xl border border-[#303030] bg-[#161616] px-4 py-2">

              <p className="text-[9px] uppercase tracking-wider text-[#666]">
                Time
              </p>

              <span
                className={`font-mono text-lg font-semibold ${
                  timeLeft <= 30 &&
                  !finished
                    ? "text-[#C56A85]"
                    : "text-white"
                }`}
              >
                {formatTime(
                  timeLeft
                )}
              </span>

            </div>

          </div>

        </div>

      </header>

      {/* ================= MAIN CONTENT ================= */}

      <div className="mx-auto max-w-7xl px-5 py-5">

        {/* ================= TOPIC ================= */}

        <section className="mb-5 rounded-2xl border border-[#222] bg-[#0d0d0d] p-5">

          <div className="flex items-center gap-3">

            <span className="h-px w-8 bg-[#8F2945]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85A70]">
              Today's GD Topic
            </p>

          </div>

          <h1 className="mt-3 text-xl font-semibold md:text-2xl">
            {challenge.topicTitle}
          </h1>

          {challenge.topicDescription && (
            <p className="mt-2 max-w-4xl text-xs leading-5 text-[#666]">
              {
                challenge.topicDescription
              }
            </p>
          )}

        </section>

        {/* ================= LIVE CONFERENCE ================= */}

        <section className="overflow-hidden rounded-2xl border border-[#222] bg-[#0d0d0d]">

          <div className="border-b border-[#222] px-5 py-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold">
                  Live Conference
                </p>

                <p className="mt-1 text-xs text-[#666]">
                  Speak with the other students in your GD.
                </p>

              </div>

              <span className="rounded-full bg-[#8F2945]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C56A85]">
                Live
              </span>

            </div>

          </div>

          {/* CAMERA + MIC */}

          <div className="h-[650px]">

            <LiveKitMeeting
              token={token}
              serverUrl={
                process.env
                  .NEXT_PUBLIC_LIVEKIT_URL ||
                ""
              }
              topic={{
                title:
                  challenge.topicTitle,
                description:
                  challenge.topicDescription,
                level:
                  challenge.level,
              }}
            />

          </div>

        </section>

        {/* ================= CHAT ================= */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-[#222] bg-[#0d0d0d]">

          <div className="border-b border-[#222] px-5 py-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold">
                  Discussion Chat
                </p>

                <p className="mt-1 text-xs text-[#666]">
                  Use chat if you need to communicate without speaking.
                </p>

              </div>

              <span className="rounded-full bg-[#181818] px-3 py-1 text-[10px] text-[#666]">
                {messages.length}
              </span>

            </div>

          </div>

          {/* MESSAGES */}

          <div className="max-h-[250px] min-h-[120px] overflow-y-auto p-4">

            {messages.length ===
            0 ? (

              <div className="flex min-h-[100px] items-center justify-center text-center">

                <div>

                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#181818] text-sm">
                    💬
                  </div>

                  <p className="mt-3 text-xs font-medium">
                    No messages yet
                  </p>

                  <p className="mt-1 text-[10px] text-[#555]">
                    Start the conversation.
                  </p>

                </div>

              </div>

            ) : (

              <div className="space-y-4">

                {messages.map(
                  (item) => (

                    <div
                      key={item.id}
                      className="flex gap-3"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#181818] text-[10px] font-semibold text-[#aaa]">
                        {item.name
                          ?.charAt(
                            0
                          )
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <div className="flex items-center gap-2">

                          <p className="text-xs font-medium">
                            {item.name}
                          </p>

                          <span className="text-[9px] text-[#444]">
                            {new Date(
                              item.createdAt
                            ).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>

                        </div>

                        <p className="mt-1 break-words text-xs leading-5 text-[#888]">
                          {
                            item.message
                          }
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* CHAT INPUT */}

          {!finished && (

            <div className="border-t border-[#222] bg-[#0a0a0a] p-3">

              <div className="flex gap-2">

                <input
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  onKeyDown={(
                    event
                  ) => {

                    if (
                      event.key ===
                      "Enter"
                    ) {
                      event.preventDefault();
                      sendMessage();
                    }

                  }}
                  placeholder="Type a message..."
                  disabled={
                    sending
                  }
                  className="min-w-0 flex-1 rounded-xl border border-[#292929] bg-[#171717] px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#555] focus:border-[#8F2945]"
                />

                <button
                  onClick={
                    sendMessage
                  }
                  disabled={
                    sending ||
                    !message.trim()
                  }
                  className="rounded-xl bg-[#8F2945] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#762139] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {sending
                    ? "..."
                    : "Send"}
                </button>

              </div>

            </div>

          )}

        </section>

        {/* ================= FINISH GD ================= */}

        <section className="mt-5 rounded-2xl border border-[#292929] bg-[#0d0d0d] p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold">
                Ready to finish?
              </p>

              <p className="mt-1 text-xs leading-5 text-[#666]">
                End your GD and view your performance result.
              </p>

            </div>

            <button
              onClick={finishGD}
              disabled={finishing}
              className="rounded-xl bg-[#8F2945] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#762139] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {finishing
                ? "Generating Result..."
                : "Finish GD →"}
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}