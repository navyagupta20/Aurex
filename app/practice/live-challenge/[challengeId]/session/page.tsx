"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

type Participant = {
  id: string;
  userId: string;
  name: string;
  joinedAt: string;
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

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [challengeId, setChallengeId] =
    useState<string | null>(null);

  const [challenge, setChallenge] =
    useState<Challenge | null>(null);

  const [participants, setParticipants] =
    useState<Participant[]>([]);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [timeLeft, setTimeLeft] =
    useState(15 * 60);

  const [finished, setFinished] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [cameraOn, setCameraOn] =
    useState(false);

  const [micOn, setMicOn] =
    useState(false);

  const [cameraError, setCameraError] =
    useState("");

  /* ================= GET CHALLENGE ID ================= */

  useEffect(() => {
    async function getParams() {
      try {
        const resolvedParams = await params;

        setChallengeId(
          resolvedParams.challengeId
        );
      } catch (error) {
        console.error(error);

        setError("Invalid challenge URL.");

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
        const response = await fetch(
          `/api/live-challenges/${challengeId}`
        );

        if (!response.ok) {
          throw new Error(
            "Challenge not found"
          );
        }

        const data = await response.json();

        setChallenge(data);
      } catch (error) {
        console.error(error);

        setError(
          "This live challenge does not exist."
        );
      }
    }

    loadChallenge();
  }, [challengeId]);

  /* ================= LOAD PARTICIPANTS ================= */

  useEffect(() => {
    if (!challengeId) return;

    async function loadParticipants() {
      try {
        const response = await fetch(
          `/api/live-challenges/${challengeId}/participants`
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

    const interval = setInterval(
      loadParticipants,
      3000
    );

    return () =>
      clearInterval(interval);
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

        if (!response.ok) {
          throw new Error(
            "Failed to load messages"
          );
        }

        const data = await response.json();

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

  /* ================= TIMER ================= */

  useEffect(() => {
    if (finished) return;

    const interval = setInterval(() => {
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
  }, [finished]);

  /* ================= CAMERA ================= */

  async function startCamera() {
    try {
      setCameraError("");

      if (!navigator.mediaDevices) {
        setCameraError(
          "Camera is not supported by this browser."
        );

        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: true,
            audio: true,
          }
        );

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;
      }

      const videoTrack =
        stream.getVideoTracks()[0];

      const audioTrack =
        stream.getAudioTracks()[0];

      if (videoTrack) {
        videoTrack.enabled = true;

        setCameraOn(true);
      }

      if (audioTrack) {
        audioTrack.enabled = true;

        setMicOn(true);
      }
    } catch (error) {
      console.error(error);

      setCameraError(
        "Camera or microphone permission was denied."
      );

      setCameraOn(false);
      setMicOn(false);
    }
  }

  /* ================= CAMERA TOGGLE ================= */

  function toggleCamera() {
    const stream = streamRef.current;

    if (!stream) {
      startCamera();

      return;
    }

    const videoTrack =
      stream.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled =
      !videoTrack.enabled;

    setCameraOn(
      videoTrack.enabled
    );
  }

  /* ================= MIC TOGGLE ================= */

  function toggleMic() {
    const stream = streamRef.current;

    if (!stream) {
      startCamera();

      return;
    }

    const audioTrack =
      stream.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled =
      !audioTrack.enabled;

    setMicOn(
      audioTrack.enabled
    );
  }

  /* ================= STOP CAMERA ================= */

  useEffect(() => {
    return () => {
      streamRef.current
        ?.getTracks()
        .forEach((track) =>
          track.stop()
        );
    };
  }, []);

  /* ================= FORMAT TIMER ================= */

  function formatTime(seconds: number) {
    const minutes =
      Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  /* ================= SEND MESSAGE ================= */

  async function sendMessage() {
    if (!challengeId) return;

    if (!message.trim()) return;

    if (finished) return;

    try {
      setSending(true);

      const userId =
        "1cdf19aa-f9c1-4ca9-a2b4-ad9e8e797d24";

      const name = "You";

      const response = await fetch(
        `/api/live-challenges/${challengeId}/messages`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId,
            name,
            message: message.trim(),
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

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#121212] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#333] border-t-[#8F2945]" />

          <p className="mt-4 text-sm text-[#777]">
            Loading live session...
          </p>
        </div>
      </main>
    );
  }

  /* ================= ERROR ================= */

  if (error || !challenge) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#121212] px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-[#292929] bg-[#191919] p-8 text-center shadow-2xl">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8F2945]/10 text-[#8F2945]">
            !
          </div>

          <h1 className="mt-5 text-2xl font-semibold">
            Session unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#777]">
            {error}
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

  /* ================= PAGE ================= */

  return (
    <main className="min-h-screen bg-[#121212] text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-20 border-b border-[#292929] bg-[#151515]/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8F2945] text-sm font-bold text-white shadow-lg shadow-[#8F2945]/20">
              A
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight">
                Aurex
              </p>

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">
                {challenge.level} · Live GD
              </p>
            </div>

          </div>

          {/* STATUS */}

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 sm:flex">

              <span
                className={`h-2 w-2 rounded-full ${
                  finished
                    ? "bg-[#555]"
                    : "bg-[#8F2945]"
                }`}
              />

              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#777]">
                {finished
                  ? "Ended"
                  : "Live"}
              </span>

            </div>

            <div
              className={`rounded-xl border px-4 py-2 ${
                timeLeft <= 60 &&
                !finished
                  ? "border-[#8F2945]/60 bg-[#8F2945]/10 text-[#C56A85]"
                  : "border-[#303030] bg-[#1c1c1c] text-white"
              }`}
            >
              <span className="font-mono text-lg font-semibold tracking-wide">
                {formatTime(timeLeft)}
              </span>
            </div>

          </div>

        </div>

      </header>

      {/* ================= CONTENT ================= */}

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* ================= TOPIC ================= */}

        <section className="mb-8">

          <div className="flex items-center gap-3">

            <span className="h-px w-8 bg-[#8F2945]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A85A70]">
              Discussion Topic
            </p>

          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
            {challenge.topicTitle}
          </h1>

          {challenge.topicDescription && (
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[#777]">
              {challenge.topicDescription}
            </p>
          )}

        </section>

        {/* ================= MAIN GRID ================= */}

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">

          {/* ================= PARTICIPANTS ================= */}

          <aside className="h-fit overflow-hidden rounded-2xl border border-[#292929] bg-[#191919] shadow-xl">

            <div className="border-b border-[#292929] px-5 py-4">

              <div className="flex items-center justify-between">

                <h2 className="text-sm font-semibold">
                  Participants
                </h2>

                <span className="rounded-full bg-[#222] px-2.5 py-1 text-[10px] font-semibold text-[#777]">
                  {participants.length}/
                  {challenge.maxParticipants}
                </span>

              </div>

            </div>

            <div className="p-3">

              {participants.length === 0 ? (

                <p className="px-2 py-5 text-sm text-[#666]">
                  Waiting for participants...
                </p>

              ) : (

                <div className="space-y-1">

                  {participants.map(
                    (participant) => (

                      <div
                        key={participant.id}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#222]"
                      >

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#202020] text-xs font-semibold text-[#aaa] transition group-hover:border-[#8F2945]/50 group-hover:text-[#C56A85]">
                          {participant.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-medium">
                            {participant.name}
                          </p>

                          <p className="text-[10px] text-[#555]">
                            Participant
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

          </aside>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-5">

            {/* ================= CAMERA ================= */}

            <section className="overflow-hidden rounded-2xl border border-[#292929] bg-[#191919] shadow-xl">

              <div className="flex items-center justify-between border-b border-[#292929] px-5 py-4">

                <div>

                  <h2 className="text-sm font-semibold">
                    Your Camera
                  </h2>

                  <p className="mt-1 text-[10px] text-[#555]">
                    Camera preview
                  </p>

                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                    cameraOn
                      ? "bg-[#8F2945]/10 text-[#C56A85]"
                      : "bg-[#222] text-[#555]"
                  }`}
                >
                  {cameraOn
                    ? "Camera On"
                    : "Camera Off"}
                </span>

              </div>

              <div className="p-4">

                <div className="relative aspect-video overflow-hidden rounded-xl border border-[#292929] bg-[#101010]">

                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`h-full w-full object-cover ${
                      cameraOn
                        ? "block"
                        : "hidden"
                    }`}
                  />

                  {!cameraOn && (
                    <div className="flex h-full items-center justify-center">

                      <div className="text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#303030] bg-[#1c1c1c] text-xl">
                          👤
                        </div>

                        <p className="mt-4 text-sm font-medium">
                          Camera is off
                        </p>

                        <p className="mt-1 text-[11px] text-[#555]">
                          Turn on your camera
                          to join the GD.
                        </p>

                      </div>

                    </div>
                  )}

                </div>

                {cameraError && (
                  <p className="mt-3 text-center text-xs text-[#C56A85]">
                    {cameraError}
                  </p>
                )}

                {/* CONTROLS */}

                <div className="mt-4 flex justify-center gap-2">

                  <button
                    onClick={toggleMic}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
                      micOn
                        ? "border-[#333] bg-[#222] text-white hover:border-[#8F2945]/50"
                        : "border-[#542536] bg-[#28151c] text-[#C56A85] hover:bg-[#351a24]"
                    }`}
                  >
                    {micOn
                      ? "🎤 Mic On"
                      : "🔇 Mic Off"}
                  </button>

                  <button
                    onClick={toggleCamera}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
                      cameraOn
                        ? "border-[#333] bg-[#222] text-white hover:border-[#8F2945]/50"
                        : "border-[#542536] bg-[#28151c] text-[#C56A85] hover:bg-[#351a24]"
                    }`}
                  >
                    {cameraOn
                      ? "🎥 Camera On"
                      : "📷 Camera Off"}
                  </button>

                </div>

                {!cameraOn && (
                  <div className="mt-3 text-center">

                    <button
                      onClick={startCamera}
                      className="text-[11px] font-medium text-[#A85A70] transition hover:text-[#C56A85] hover:underline"
                    >
                      Allow camera & microphone
                    </button>

                  </div>
                )}

              </div>

            </section>

            {/* ================= CHAT ================= */}

            <section className="overflow-hidden rounded-2xl border border-[#292929] bg-[#191919] shadow-xl">

              {/* CHAT HEADER */}

              <div className="flex items-center justify-between border-b border-[#292929] px-5 py-4">

                <div>

                  <h2 className="text-sm font-semibold">
                    Discussion Chat
                  </h2>

                  <p className="mt-1 text-[10px] text-[#555]">
                    Talk with participants
                  </p>

                </div>

                <span className="rounded-full bg-[#222] px-2.5 py-1 text-[10px] text-[#666]">
                  {messages.length}
                </span>

              </div>

              {/* CHAT MESSAGES */}

              <div className="max-h-[240px] min-h-[150px] overflow-y-auto p-4">

                {messages.length === 0 ? (

                  <div className="flex min-h-[130px] items-center justify-center text-center">

                    <div>

                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#303030] bg-[#202020] text-sm">
                        💬
                      </div>

                      <p className="mt-3 text-xs font-medium">
                        No messages yet
                      </p>

                      <p className="mt-1 text-[11px] text-[#555]">
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

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#202020] text-[10px] font-semibold text-[#aaa]">
                            {item.name
                              ?.charAt(0)
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
                              {item.message}
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

                <div className="border-t border-[#292929] bg-[#161616] p-3">

                  <div className="flex gap-2">

                    <input
                      value={message}
                      onChange={(event) =>
                        setMessage(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key ===
                          "Enter"
                        ) {
                          event.preventDefault();

                          sendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                      disabled={sending}
                      className="min-w-0 flex-1 rounded-xl border border-[#2b2b2b] bg-[#202020] px-3 py-2.5 text-xs text-white outline-none placeholder:text-[#555] transition focus:border-[#8F2945]"
                    />

                    <button
                      onClick={sendMessage}
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

            {/* ================= FINISHED ================= */}

            {finished && (

              <div className="rounded-2xl border border-[#292929] bg-[#191919] p-6 text-center shadow-xl">

                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#8F2945]/10 text-[#C56A85]">
                  ✓
                </div>

                <p className="mt-4 text-sm font-semibold">
                  GD Finished
                </p>

                <p className="mt-1 text-xs text-[#555]">
                  The 15-minute discussion
                  has ended.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}