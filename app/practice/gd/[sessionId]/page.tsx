"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

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

type Session = {
  sessionId: string;
  topicId: string;
  topicTitle: string;
  topicDescription: string | null;
  level: string;
  duration: number;
  status: string;
  topicRevealedAt: string | null;
  thinkingEndsAt: string | null;
  gdStartsAt: string | null;
  gdEndsAt: string | null;
  createdAt: string;
};

type Phase =
  | "thinking"
  | "gd"
  | "finished";

export default function GDSessionPage({
  params,
}: Props) {
  const router = useRouter();

  /* ================= SESSION ================= */

  const [sessionId, setSessionId] =
    useState<string | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [participants, setParticipants] =
    useState<Participant[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [endingSession, setEndingSession] =
    useState(false);

  /* ================= PHASE ================= */

  const [phase, setPhase] =
    useState<Phase>("thinking");

  const [timeLeft, setTimeLeft] =
    useState(120);

  /* ================= CAMERA + MICROPHONE ================= */

  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const [cameraOn, setCameraOn] =
    useState(false);

  const [micOn, setMicOn] =
    useState(false);

  const [mediaError, setMediaError] =
    useState("");

  /* ================= GET SESSION ID ================= */

  useEffect(() => {
    async function getSessionId() {
      try {
        const resolvedParams =
          await params;

        setSessionId(
          resolvedParams.sessionId
        );
      } catch (error) {
        console.error(
          "PARAM ERROR:",
          error
        );
      }
    }

    getSessionId();
  }, [params]);

  /* ================= LOAD SESSION ================= */

  useEffect(() => {
    if (!sessionId) return;

    async function loadSession() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/sessions/${sessionId}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "GD session not found"
          );
        }

        const data: Session =
          await response.json();

        setSession(data);

        updatePhase(data);
      } catch (error) {
        console.error(
          "SESSION LOAD ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [sessionId]);

  /* ================= PHASE CALCULATION ================= */

  function updatePhase(
    currentSession: Session
  ) {
    const now = Date.now();

    const thinkingEnd =
      currentSession.thinkingEndsAt
        ? new Date(
            currentSession.thinkingEndsAt
          ).getTime()
        : now + 120000;

    const gdEnd =
      currentSession.gdEndsAt
        ? new Date(
            currentSession.gdEndsAt
          ).getTime()
        : thinkingEnd + 900000;

    /* ================= THINKING ================= */

    if (now < thinkingEnd) {
      setPhase("thinking");

      setTimeLeft(
        Math.max(
          0,
          Math.ceil(
            (thinkingEnd - now) /
              1000
          )
        )
      );

      return;
    }

    /* ================= LIVE GD ================= */

    if (now < gdEnd) {
      setPhase("gd");

      setTimeLeft(
        Math.max(
          0,
          Math.ceil(
            (gdEnd - now) /
              1000
          )
        )
      );

      return;
    }

    /* ================= FINISHED ================= */

    setPhase("finished");

    setTimeLeft(0);
  }

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!session) return;

    updatePhase(session);

    const timer =
      setInterval(() => {
        updatePhase(session);
      }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [session]);

  /* ================= AUTO STOP MEDIA ================= */

  useEffect(() => {
    if (phase === "finished") {
      stopAllMedia();
    }
  }, [phase]);

  /* ================= LOAD PARTICIPANTS ================= */

  useEffect(() => {
    if (!sessionId) return;

    async function loadParticipants() {
      try {
        const response = await fetch(
          `/api/live-challenges/${sessionId}/participants`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          return;
        }

        const data: Participant[] =
          await response.json();

        setParticipants(data);
      } catch (error) {
        console.error(
          "PARTICIPANT LOAD ERROR:",
          error
        );
      }
    }

    loadParticipants();

    const interval =
      setInterval(
        loadParticipants,
        3000
      );

    return () => {
      clearInterval(interval);
    };
  }, [sessionId]);

  /* ================= CAMERA ================= */

  async function startCamera() {
    try {
      setMediaError("");

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: true,
            audio: micOn,
          }
        );

      streamRef.current =
        stream;

      if (videoRef.current) {
        videoRef.current.srcObject =
          stream;
      }

      setCameraOn(true);
    } catch (error) {
      console.error(error);

      setMediaError(
        "Camera permission was denied or the camera is unavailable."
      );
    }
  }

  function stopCamera() {
    if (!streamRef.current) {
      setCameraOn(false);
      return;
    }

    streamRef.current
      .getVideoTracks()
      .forEach((track) => {
        track.stop();
      });

    setCameraOn(false);
  }

  async function toggleCamera() {
    if (cameraOn) {
      stopCamera();
    } else {
      await startCamera();
    }
  }

  /* ================= MICROPHONE ================= */

  async function startMicrophone() {
    try {
      setMediaError("");

      const audioStream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: true,
          }
        );

      const audioTrack =
        audioStream.getAudioTracks()[0];

      if (streamRef.current) {
        streamRef.current.addTrack(
          audioTrack
        );
      } else {
        streamRef.current =
          audioStream;
      }

      setMicOn(true);
    } catch (error) {
      console.error(error);

      setMediaError(
        "Microphone permission was denied or the microphone is unavailable."
      );
    }
  }

  function stopMicrophone() {
    if (!streamRef.current) {
      setMicOn(false);
      return;
    }

    streamRef.current
      .getAudioTracks()
      .forEach((track) => {
        track.stop();
      });

    setMicOn(false);
  }

  async function toggleMicrophone() {
    if (micOn) {
      stopMicrophone();
    } else {
      await startMicrophone();
    }
  }

  /* ================= STOP ALL MEDIA ================= */

  function stopAllMedia() {
    if (!streamRef.current) {
      setCameraOn(false);
      setMicOn(false);
      return;
    }

    streamRef.current
      .getTracks()
      .forEach((track) => {
        track.stop();
      });

    streamRef.current = null;

    setCameraOn(false);
    setMicOn(false);
  }

  /* ================= END SESSION ================= */

  async function endSession() {
    if (!sessionId) {
      return;
    }

    if (endingSession) {
      return;
    }

    try {
      setEndingSession(true);

      const response =
        await fetch(
          `/api/sessions/${sessionId}/result`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              communicationScore: 0,
              contentScore: 0,
              confidenceScore: 0,
              relevanceScore: 0,
              participationScore: 0,
              leadershipScore: 0,

              strengths: "",
              improvements: "",
              analysis: "",
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to save GD result."
        );
      }

      stopAllMedia();

      router.push(
        `/practice/gd/${sessionId}/results`
      );
    } catch (error) {
      console.error(
        "END SESSION ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to finish GD session."
      );

      setEndingSession(false);
    }
  }

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
      }
    };
  }, []);

  /* ================= FORMAT TIMER ================= */

  function formatTime(
    seconds: number
  ) {
    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;

    return `${String(
      minutes
    ).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(
      2,
      "0"
    )}`;
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

  /* ================= SESSION NOT FOUND ================= */

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-6 text-white">

        <div className="w-full max-w-md rounded-2xl border border-[#292929] bg-[#151515] p-8 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8F2945]/10 text-[#C56A85]">
            !
          </div>

          <h1 className="mt-5 text-2xl font-semibold">
            Session unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#777]">
            This GD session could not
            be loaded.
          </p>

          <button
            onClick={() =>
              router.push(
                "/practice/topic-based"
              )
            }
            className="mt-6 rounded-lg bg-[#8F2945] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#762139]"
          >
            Back to Topics
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

          {/* ================= LEFT ================= */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8F2945] text-sm font-bold">
              A
            </div>

            <div>

              <p className="text-sm font-semibold">
                Aurex
              </p>

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">
                {session.level} · Topic GD
              </p>

            </div>

          </div>

          {/* ================= CENTER ================= */}

          <div className="hidden max-w-xl flex-1 text-center md:block">

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8F2945]">
              Discussion Topic
            </p>

            <p className="mt-1 truncate text-sm font-semibold">
              {session.topicTitle}
            </p>

          </div>

          {/* ================= TIMER ================= */}

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">

              <span
                className={`h-2 w-2 rounded-full ${
                  phase === "finished"
                    ? "bg-[#555]"
                    : phase === "thinking"
                    ? "bg-[#8F2945]"
                    : "bg-green-500"
                }`}
              />

              <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-[#777] sm:block">
                {phase === "thinking"
                  ? "Thinking"
                  : phase === "gd"
                  ? "Live"
                  : "Ended"}
              </span>

            </div>

            <div className="rounded-xl border border-[#303030] bg-[#161616] px-4 py-2">

              <p className="text-[9px] uppercase tracking-wider text-[#666]">
                Time
              </p>

              {phase === "finished" ? (
                <span className="font-mono text-lg font-semibold text-[#C56A85]">
                  00:00
                </span>
              ) : (
                <span
                  className={`font-mono text-lg font-semibold ${
                    timeLeft <= 30
                      ? "text-[#C56A85]"
                      : "text-white"
                  }`}
                >
                  {formatTime(
                    timeLeft
                  )}
                </span>
              )}

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
            {session.topicTitle}
          </h1>

          {session.topicDescription && (
            <p className="mt-2 max-w-4xl text-xs leading-5 text-[#666]">
              {session.topicDescription}
            </p>
          )}

        </section>

        {/* ================= PHASE ================= */}

        <section className="mb-5 rounded-2xl border border-[#222] bg-[#0d0d0d] p-5">

          {phase === "thinking" && (
            <>
              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C56A85]">
                  Thinking Time
                </p>

              </div>

              <h2 className="mt-3 text-xl font-semibold">
                Prepare your points
              </h2>

              <p className="mt-2 max-w-3xl text-xs leading-5 text-[#666]">
                You have 2 minutes to prepare
                your arguments. The GD will
                start automatically when the
                thinking time ends.
              </p>
            </>
          )}

          {phase === "gd" && (
            <>
              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-green-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
                  Discussion is Live
                </p>

              </div>

              <h2 className="mt-3 text-xl font-semibold">
                Start Speaking
              </h2>

              <p className="mt-2 max-w-3xl text-xs leading-5 text-[#666]">
                Present your points clearly,
                listen to others and
                participate actively in the
                discussion.
              </p>
            </>
          )}

          {phase === "finished" && (
            <>
              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-[#555]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777]">
                  Discussion Ended
                </p>

              </div>

              <h2 className="mt-3 text-xl font-semibold">
                GD has finished
              </h2>

              <p className="mt-2 max-w-3xl text-xs leading-5 text-[#666]">
                The discussion time has ended.
                Finish the session below to
                view your result.
              </p>
            </>
          )}

        </section>

        {/* ================= SESSION INFORMATION ================= */}

        <section className="mb-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-[#222] bg-[#0d0d0d] p-5">

            <p className="text-[10px] uppercase tracking-wider text-[#555]">
              Status
            </p>

            <p className="mt-2 text-lg font-semibold">
              {phase === "thinking"
                ? "Thinking"
                : phase === "gd"
                ? "Live"
                : "Finished"}
            </p>

          </div>

          <div className="rounded-2xl border border-[#222] bg-[#0d0d0d] p-5">

            <p className="text-[10px] uppercase tracking-wider text-[#555]">
              Participants
            </p>

            <p className="mt-2 text-lg font-semibold">
              {participants.length}
            </p>

          </div>

          <div className="rounded-2xl border border-[#222] bg-[#0d0d0d] p-5">

            <p className="text-[10px] uppercase tracking-wider text-[#555]">
              GD Duration
            </p>

            <p className="mt-2 text-lg font-semibold">
              15 min
            </p>

          </div>

        </section>

        {/* ================= YOUR DEVICE ================= */}

        <section className="mb-5 overflow-hidden rounded-2xl border border-[#222] bg-[#0d0d0d]">

          <div className="border-b border-[#222] px-5 py-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold">
                  Your Camera & Microphone
                </p>

                <p className="mt-1 text-xs text-[#666]">
                  Set up your device before
                  participating in the GD.
                </p>

              </div>

              <div className="flex gap-2">

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    cameraOn
                      ? "bg-green-500/10 text-green-400"
                      : "bg-[#181818] text-[#666]"
                  }`}
                >
                  Camera{" "}
                  {cameraOn
                    ? "ON"
                    : "OFF"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    micOn
                      ? "bg-green-500/10 text-green-400"
                      : "bg-[#181818] text-[#666]"
                  }`}
                >
                  Mic{" "}
                  {micOn
                    ? "ON"
                    : "OFF"}
                </span>

              </div>

            </div>

          </div>

          {/* ================= VIDEO ================= */}

          <div className="p-5">

            <div className="overflow-hidden rounded-2xl border border-[#222] bg-black">

              {cameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center">

                  <div className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#8F2945] text-2xl font-bold">
                      You
                    </div>

                    <p className="mt-4 text-xs text-[#555]">
                      Camera is turned off
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* ================= MEDIA ERROR ================= */}

            {mediaError && (
              <div className="mt-4 rounded-xl border border-red-900 bg-red-950/30 p-4 text-xs text-red-400">
                {mediaError}
              </div>
            )}

            {/* ================= BUTTONS ================= */}

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                onClick={toggleCamera}
                disabled={
                  phase === "finished"
                }
                className={`rounded-xl px-5 py-3 text-xs font-semibold transition ${
                  cameraOn
                    ? "bg-[#8F2945] text-white hover:bg-[#762139]"
                    : "bg-white text-black hover:bg-[#ddd]"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {cameraOn
                  ? "📷 Turn Camera Off"
                  : "📷 Turn Camera On"}
              </button>

              <button
                onClick={
                  toggleMicrophone
                }
                disabled={
                  phase === "thinking" ||
                  phase === "finished"
                }
                className={`rounded-xl px-5 py-3 text-xs font-semibold transition ${
                  micOn
                    ? "bg-[#8F2945] text-white hover:bg-[#762139]"
                    : "bg-white text-black hover:bg-[#ddd]"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {micOn
                  ? "🎤 Turn Mic Off"
                  : "🎤 Turn Mic On"}
              </button>

            </div>

          </div>

        </section>

        {/* ================= PARTICIPANTS ================= */}

        <section className="mb-5 overflow-hidden rounded-2xl border border-[#222] bg-[#0d0d0d]">

          <div className="border-b border-[#222] px-5 py-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold">
                  Participants
                </p>

                <p className="mt-1 text-xs text-[#666]">
                  Students currently participating
                  in this GD.
                </p>

              </div>

              <span className="rounded-full bg-[#181818] px-3 py-1 text-[10px] text-[#666]">
                {participants.length}
              </span>

            </div>

          </div>

          <div className="p-4">

            {participants.length ===
            0 ? (
              <div className="flex min-h-[120px] items-center justify-center text-center">

                <div>

                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#181818] text-sm">
                    👥
                  </div>

                  <p className="mt-3 text-xs font-medium">
                    Waiting for participants...
                  </p>

                  <p className="mt-1 text-[10px] text-[#555]">
                    Participants will appear
                    automatically.
                  </p>

                </div>

              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">

                {participants.map(
                  (participant) => (
                    <div
                      key={
                        participant.id
                      }
                      className="flex items-center gap-3 rounded-xl border border-[#222] bg-[#0a0a0a] p-4"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#181818] text-xs font-semibold text-[#aaa]">
                        {participant.name
                          ?.charAt(
                            0
                          )
                          .toUpperCase()}
                      </div>

                      <div>

                        <p className="text-xs font-semibold">
                          {
                            participant.name
                          }
                        </p>

                        <p className="mt-1 text-[10px] text-[#555]">
                          Participant
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </section>

        {/* ================= FINISH GD ================= */}

        <section className="rounded-2xl border border-[#292929] bg-[#0d0d0d] p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold">
                Ready to finish?
              </p>

              <p className="mt-1 text-xs leading-5 text-[#666]">
                End your GD and view your
                performance result.
              </p>

            </div>

            <button
              onClick={endSession}
              disabled={
                endingSession
              }
              className="rounded-xl bg-[#8F2945] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#762139] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {endingSession
                ? "Generating Result..."
                : phase === "finished"
                ? "View GD Results →"
                : "Finish GD →"}
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}