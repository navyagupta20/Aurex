"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Challenge = {
  id: string;
  topicId: string;
  topicTitle: string;
  level: string;
  maxParticipants: number;
  status: string;
};

export default function LiveAdvanced() {
  const router = useRouter();

  const [challenge, setChallenge] =
    useState<Challenge | null>(null);

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  async function findChallenge() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/live-challenges",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load challenges"
        );
      }

      const data: Challenge[] =
        await response.json();

      const waitingChallenge = data.find(
        (item) =>
          item.level.toLowerCase() ===
            "advanced" &&
          item.status === "waiting" &&
          item.maxParticipants > 0
      );

      setChallenge(
        waitingChallenge || null
      );
    } catch (error) {
      console.error(error);
      setChallenge(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    findChallenge();
  }, []);

  async function joinChallenge() {
    if (!challenge) {
      alert(
        "No advanced live challenge is available right now."
      );
      return;
    }

    try {
      setJoining(true);

      const userResponse =
        await fetch("/api/auth/me");

      if (!userResponse.ok) {
        alert("Please sign in first.");
        router.push("/signin");
        return;
      }

      const user =
        await userResponse.json();

      const response = await fetch(
        `/api/live-challenges/${challenge.id}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Unable to join challenge."
        );
        return;
      }

      router.push(
        `/practice/live-challenge/${challenge.id}/session`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while joining."
      );
    } finally {
      setJoining(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* NAVBAR */}

      <nav className="border-b border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#171717] text-sm font-bold text-white">
              A
            </div>

            <div>

              <p className="text-lg font-bold tracking-tight">
                Aurex
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8F2945]">
                Practice. Prepare. Compete.
              </p>

            </div>

          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">

            <Link
              href="/"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Home
            </Link>

            <Link
              href="/practice"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Practice
            </Link>

            <Link
              href="/practice/live-challenge"
              className="text-[#8F2945]"
            >
              Live GD
            </Link>

            <Link
              href="/about"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              About
            </Link>

            <Link
              href="/signin"
              className="rounded-lg bg-[#171717] px-5 py-2.5 text-white transition hover:bg-[#8F2945]"
            >
              Sign In
            </Link>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section className="relative overflow-hidden bg-white">

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -right-2 top-28 h-44 w-44 rounded-full border border-[#E7E7E7]" />

        <div className="pointer-events-none absolute left-[-100px] top-40 h-64 w-64 rounded-full bg-[#8F2945]/5" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-24">

          <div className="max-w-3xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Live Challenge • Advanced
              </span>

            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl">

              Join an
              <span className="text-[#8F2945]">
                {" "}Advanced GD.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">
              Challenge yourself with complex,
              placement-level discussions that
              require strong reasoning and
              communication.
            </p>

          </div>

        </div>

      </section>

      {/* SESSION */}

      <section className="bg-[#FAFAF9] py-16 lg:py-20">

        <div className="mx-auto max-w-5xl px-6 lg:px-10">

          <div className="flex items-center gap-4">

            <div className="h-px flex-1 bg-[#E2E2E2]" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#999]">
              Session Information
            </p>

            <div className="h-px flex-1 bg-[#E2E2E2]" />

          </div>

          <div className="mt-8 rounded-2xl border border-[#E2E2E2] bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.05)] md:p-9">

            {loading ? (

              <div className="py-14 text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#E5E5E5] border-t-[#8F2945]" />

                <p className="mt-5 text-sm font-medium text-[#6B6863]">
                  Finding an available session...
                </p>

              </div>

            ) : challenge ? (

              <>

                <div className="flex flex-col justify-between gap-5 border-b border-[#EEEEEE] pb-7 sm:flex-row sm:items-start">

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8F2945]">
                      Session Available
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
                      Ready to join?
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-[#6B6863]">
                      Enter the live session and
                      prepare for the discussion.
                    </p>

                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#8F2945]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#8F2945]">

                    <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

                    Waiting

                  </span>

                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">

                  <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-5">

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">
                      Level
                    </p>

                    <p className="mt-2 text-lg font-bold capitalize">
                      {challenge.level}
                    </p>

                  </div>

                  <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAF9] p-5">

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">
                      Thinking Time
                    </p>

                    <p className="mt-2 text-lg font-bold">
                      2 minutes
                    </p>

                  </div>

                </div>

                <div className="mt-5 rounded-xl border border-[#E5E5E5] bg-[#171717] p-6 text-white">

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8F2945]">

                      <span className="text-lg font-bold">
                        ?
                      </span>

                    </div>

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A5A5A5]">
                        GD Topic
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        Revealed inside the GD
                      </p>

                      <p className="mt-1 text-sm text-[#A5A5A5]">
                        You will see the topic when
                        the session begins.
                      </p>

                    </div>

                  </div>

                </div>

                <button
                  onClick={joinChallenge}
                  disabled={joining}
                  className="mt-7 w-full rounded-lg bg-[#8F2945] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#742138] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {joining
                    ? "Joining..."
                    : "Join Session →"}
                </button>

              </>

            ) : (

              <div className="py-10 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8F2945]/8">

                  <span className="text-xl text-[#8F2945]">
                    —
                  </span>

                </div>

                <h2 className="mt-5 text-2xl font-bold">
                  No session available
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B6863]">
                  There is currently no advanced
                  challenge waiting for participants.
                </p>

                <button
                  onClick={findChallenge}
                  className="mt-6 rounded-lg bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]"
                >
                  Check Again
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <div>

            <p className="font-bold">
              Aurex
            </p>

            <p className="mt-1 text-xs text-[#999]">
              Practice. Prepare. Compete.
            </p>

          </div>

          <p className="text-xs text-[#999]">
            Placement preparation, built better.
          </p>

        </div>

      </footer>

    </main>
  );
}