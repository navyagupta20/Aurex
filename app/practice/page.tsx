import Link from "next/link";

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-white">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -right-2 top-28 h-44 w-44 rounded-full border border-[#E7E7E7]" />

        <div className="pointer-events-none absolute left-[-100px] top-52 h-64 w-64 rounded-full bg-[#8F2945]/5" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10 lg:pb-18 lg:pt-16">

          <div className="max-w-4xl">

            {/* ================= BACK TO HOME ================= */}

            <Link
              href="/"
              className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#6B6863] transition hover:text-[#8F2945]"
            >
              <span className="text-lg">←</span>
              <span>Back to Home</span>
            </Link>


            {/* ================= LABEL ================= */}

            <div className="mb-4">

              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                  Aurex · GD Preparation
                </span>

              </div>

            </div>


            {/* ================= HEADING ================= */}

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

              Explore your{" "}

              <span className="text-[#8F2945]">
                potential
              </span>

            </h1>


            {/* ================= DESCRIPTION ================= */}

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">
              Build confidence, sharpen your ideas, and strengthen
              the communication skills you need to perform better
              in every group discussion.
            </p>

          </div>

        </div>

      </section>


      {/* ================= PRACTICE OPTIONS ================= */}

      <section className="bg-[#FAFAF9] pt-10 pb-16 lg:pt-12 lg:pb-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* ================= SECTION HEADING ================= */}

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                Practice
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                Choose how you want to practice
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B6863]">
                Practice independently or step into a real-time
                group discussion environment.
              </p>

            </div>

          </div>


          {/* ================= CARDS ================= */}

          <div className="mt-10 grid gap-5 md:grid-cols-2">


            {/* ================= TOPIC BASED ================= */}

            <article className="group flex min-h-[320px] flex-col rounded-2xl border border-[#E2E2E2] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">

              <div className="flex items-center justify-between">

                <span className="text-xs font-bold text-[#B5B5B5]">
                  Topic-Based
                </span>

                <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                  Self Practice
                </span>

              </div>


              <div className="mt-8">

                <h3 className="text-2xl font-bold leading-snug tracking-[-0.02em]">
                  Topic-Based GD
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-[#777]">
                  Explore curated group discussion topics across
                  different difficulty levels. Organise your thoughts,
                  build strong arguments, and practise at your own pace.
                </p>

              </div>


              <div className="mt-auto border-t border-[#EEEEEE] pt-5">

                <Link
                  href="/practice/topic-based"
                  className="flex items-center justify-between text-sm font-semibold text-[#171717]"
                >

                  <span>
                    Explore Topics
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCDCDC] text-sm transition group-hover:border-[#8F2945] group-hover:bg-[#8F2945] group-hover:text-white">
                    →
                  </span>

                </Link>

              </div>

            </article>


            {/* ================= LIVE GD ================= */}

            <article className="group flex min-h-[320px] flex-col rounded-2xl border border-[#E2E2E2] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">

              <div className="flex items-center justify-between">

                <span className="text-xs font-bold text-[#B5B5B5]">
                  Live Discussion
                </span>

                <span className="flex items-center gap-2 rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#8F2945]" />

                  Live GD

                </span>

              </div>


              <div className="mt-8">

                <h3 className="text-2xl font-bold leading-snug tracking-[-0.02em]">
                  Live Group Discussion
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-[#777]">
                  Join a real-time discussion with other students.
                  Respond to different viewpoints, communicate your
                  ideas clearly, and experience a realistic GD setting.
                </p>

              </div>


              <div className="mt-auto border-t border-[#EEEEEE] pt-5">

                <Link
                  href="/practice/live-challenge"
                  className="flex items-center justify-between text-sm font-semibold text-[#171717]"
                >

                  <span>
                    Join Live GD
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCDCDC] text-sm transition group-hover:border-[#8F2945] group-hover:bg-[#8F2945] group-hover:text-white">
                    →
                  </span>

                </Link>

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

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