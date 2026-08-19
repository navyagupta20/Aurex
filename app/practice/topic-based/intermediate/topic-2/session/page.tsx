"use client";

import { useEffect, useState } from "react";

export default function IntermediateTopicTwoSession() {
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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Intermediate GD
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Group Discussion Session
            </h1>
          </div>

          {/* Timer */}
          <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-4 text-center">

            <p className="text-xs uppercase tracking-widest text-slate-500">
              Time Remaining
            </p>

            <p className="mt-1 text-3xl font-bold">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </p>

          </div>

        </div>


        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Discussion */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Discussion Topic
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight">
              Is Work From Home Better Than Office Work?
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Discuss productivity, collaboration, flexibility,
              work-life balance, and employee well-being.
            </p>


            {/* Response */}
            <div className="mt-8">

              <p className="mb-3 text-sm font-semibold text-slate-300">
                Your Discussion
              </p>

              <textarea
                placeholder="Write your points here..."
                className="min-h-40 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
              />

            </div>


            <button className="mt-5 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950">
              Submit Response
            </button>

          </div>


          {/* Participants */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Participants
            </p>

            <div className="mt-6 space-y-4">

              <div className="rounded-lg border border-slate-800 p-4">
                <p className="font-semibold">
                  You
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Participant 01
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 p-4">
                <p className="font-semibold">
                  Participant 02
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Online
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 p-4">
                <p className="font-semibold">
                  Participant 03
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Online
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 p-4">
                <p className="font-semibold">
                  Participant 04
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Online
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Tip */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">

          <p className="text-sm text-slate-400">
            💡 Present your ideas clearly, listen to other
            participants, and support your arguments with
            relevant examples.
          </p>

        </div>

      </div>

    </main>
  );
}