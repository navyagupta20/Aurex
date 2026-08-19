"use client";

import { useEffect, useState } from "react";

export default function LiveSession() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const sessionEnded = timeLeft === 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <header className="border-b border-slate-800">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>

            <p className="text-sm text-slate-500">
              Live Challenge • Beginner
            </p>

            <h1 className="text-xl font-bold">
              Live GD Session
            </h1>

          </div>


          {/* Timer */}

          <div className="text-right">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              {sessionEnded ? "Session Status" : "Time Remaining"}
            </p>

            <p className="mt-1 text-2xl font-bold">
              {sessionEnded
                ? "Session Ended"
                : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
            </p>

          </div>

        </div>

      </header>


      {/* Main */}

      <section className="mx-auto max-w-6xl px-6 py-10">


        {/* Topic */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Discussion Topic
          </p>

          <h2 className="mt-4 text-2xl font-bold">
            Topic will be revealed when the session begins
          </h2>

          <p className="mt-3 text-slate-400">
            Stay ready. The discussion topic will appear here
            once the session starts.
          </p>

        </div>


        {/* Participants */}

        <div className="mt-8">

          <h3 className="text-xl font-bold">
            Participants
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">


            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="font-semibold">
                You
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Participant 01
              </p>
            </div>


            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="font-semibold">
                Participant 02
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Online
              </p>
            </div>


            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="font-semibold">
                Participant 03
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Online
              </p>
            </div>


            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="font-semibold">
                Participant 04
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Online
              </p>
            </div>

          </div>

        </div>


        {/* Discussion */}

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h3 className="text-xl font-bold">
            Discussion
          </h3>

          <div className="mt-6 flex min-h-48 items-center justify-center rounded-xl border border-dashed border-slate-700">

            <p className="text-center text-slate-500">
              The live discussion area will appear here.
              <br />
              Real-time communication will be added later.
            </p>

          </div>

        </div>


        {/* Response */}

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h3 className="text-xl font-bold">
            Your Response
          </h3>

          <textarea
            disabled={sessionEnded}
            placeholder={
              sessionEnded
                ? "The session has ended."
                : "Write your response here..."
            }
            className="mt-4 min-h-32 w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <button
            disabled={sessionEnded}
            className="mt-4 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Response
          </button>

        </div>


        {/* Leave Session */}

        <div className="mt-8 text-center">

          <button className="rounded-lg border border-red-900 px-6 py-3 text-sm font-semibold text-red-400">
            Leave Session
          </button>

        </div>

      </section>

    </main>
  );
}