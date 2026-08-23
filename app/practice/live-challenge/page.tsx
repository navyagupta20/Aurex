import Link from "next/link";

export default function LiveChallenge() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="flex items-center gap-3">

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


          {/* ================= NAVIGATION ================= */}

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">

            <Link
              href="/"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Home
            </Link>

            {/* PRACTICE HIGHLIGHTED */}
            <Link
              href="/practice"
              className="text-[#8F2945]"
            >
              Practice
            </Link>

            {/* DASHBOARD NOT HIGHLIGHTED */}
            <Link
              href="/dashboard"
              className="text-[#6B6863] transition hover:text-[#171717]"
            >
              Dashboard
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


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-white">

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -right-2 top-28 h-44 w-44 rounded-full border border-[#E7E7E7]" />

        <div className="pointer-events-none absolute left-[-100px] top-52 h-64 w-64 rounded-full bg-[#8F2945]/5" />


        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-24">

          <div className="max-w-3xl">

            {/* Label */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Aurex Live Challenge
              </span>

            </div>


            {/* Heading */}

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl">

              Choose your{" "}

              <span className="text-[#8F2945]">
                level.
              </span>

            </h1>


            <p className="mt-6 max-w-2xl text-base leading-7 text-[#6B6863] sm:text-lg">
              Join a live GD session with other students.
              Choose your difficulty and practice communicating
              in a realistic discussion environment.
            </p>

          </div>

        </div>

      </section>


      {/* ================= LEVELS ================= */}

      <section className="bg-[#FAFAF9] py-16 lg:py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">


          {/* SECTION DIVIDER */}

          <div className="flex items-center gap-4">

            <div className="h-px flex-1 bg-[#E2E2E2]" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#999]">
              Select Difficulty
            </p>

            <div className="h-px flex-1 bg-[#E2E2E2]" />

          </div>


          {/* LEVEL CARDS */}

          <div className="mt-8 grid gap-5 md:grid-cols-3">


            {/* ================= BEGINNER ================= */}

            <article className="group flex min-h-[310px] flex-col rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">

              <div className="flex items-start justify-between">

                <span className="text-xs font-bold text-[#B5B5B5]">
                  01
                </span>

                <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                  Beginner
                </span>

              </div>


              <div className="mt-9">

                <h2 className="text-2xl font-bold tracking-[-0.02em]">
                  Beginner
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#777]">
                  Practice live discussions with simple and
                  familiar topics. Perfect for getting comfortable
                  with group discussions.
                </p>

              </div>


              <div className="mt-auto border-t border-[#EEEEEE] pt-5">

                <Link
                  href="/practice/live-challenge/beginner"
                  className="flex items-center justify-between text-sm font-semibold text-[#171717]"
                >

                  <span>
                    View Sessions
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCDCDC] text-sm transition group-hover:border-[#8F2945] group-hover:bg-[#8F2945] group-hover:text-white">
                    →
                  </span>

                </Link>

              </div>

            </article>


            {/* ================= INTERMEDIATE ================= */}

            <article className="group flex min-h-[310px] flex-col rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">

              <div className="flex items-start justify-between">

                <span className="text-xs font-bold text-[#B5B5B5]">
                  02
                </span>

                <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                  Intermediate
                </span>

              </div>


              <div className="mt-9">

                <h2 className="text-2xl font-bold tracking-[-0.02em]">
                  Intermediate
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#777]">
                  Join discussions that require stronger
                  reasoning, structured thinking and communication.
                </p>

              </div>


              <div className="mt-auto border-t border-[#EEEEEE] pt-5">

                <Link
                  href="/practice/live-challenge/intermediate"
                  className="flex items-center justify-between text-sm font-semibold text-[#171717]"
                >

                  <span>
                    View Sessions
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCDCDC] text-sm transition group-hover:border-[#8F2945] group-hover:bg-[#8F2945] group-hover:text-white">
                    →
                  </span>

                </Link>

              </div>

            </article>


            {/* ================= ADVANCED ================= */}

            <article className="group flex min-h-[310px] flex-col rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#BFA4AE] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">

              <div className="flex items-start justify-between">

                <span className="text-xs font-bold text-[#B5B5B5]">
                  03
                </span>

                <span className="rounded-full bg-[#8F2945]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8F2945]">
                  Advanced
                </span>

              </div>


              <div className="mt-9">

                <h2 className="text-2xl font-bold tracking-[-0.02em]">
                  Advanced
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#777]">
                  Challenge yourself with complex,
                  placement-level live discussions.
                </p>

              </div>


              <div className="mt-auto border-t border-[#EEEEEE] pt-5">

                <Link
                  href="/practice/live-challenge/advanced"
                  className="flex items-center justify-between text-sm font-semibold text-[#171717]"
                >

                  <span>
                    View Sessions
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


      {/* ================= INFO ================= */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="rounded-2xl border border-[#E2E2E2] bg-[#FAFAF9] p-8 md:p-10">

            <div className="grid gap-8 md:grid-cols-3">

              <div>

                <p className="text-2xl font-bold">
                  15
                </p>

                <p className="mt-1 text-sm text-[#777]">
                  Minutes per GD
                </p>

              </div>


              <div className="border-[#E5E5E5] md:border-l md:pl-8">

                <p className="text-2xl font-bold">
                  8
                </p>

                <p className="mt-1 text-sm text-[#777]">
                  Maximum participants
                </p>

              </div>


              <div className="border-[#E5E5E5] md:border-l md:pl-8">

                <p className="text-2xl font-bold">
                  3
                </p>

                <p className="mt-1 text-sm text-[#777]">
                  Difficulty levels
                </p>

              </div>

            </div>

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