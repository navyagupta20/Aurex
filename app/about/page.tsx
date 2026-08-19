import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#171717]">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <Link href="/" className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8F2945] text-sm font-bold text-white">
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
              className="text-[#6B6863] transition hover:text-[#8F2945]"
            >
              Practice
            </Link>

            <Link
              href="/about"
              className="text-[#8F2945]"
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

        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#8F2945]/10" />

        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#8F2945]/5" />

        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full border border-[#8F2945]/10" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">

          <div className="max-w-5xl">

            {/* Label */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2] bg-[#FAFAF9] px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-[#8F2945]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B6863]">
                Group Discussion Practice Platform
              </span>

            </div>


            {/* Heading */}

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

              Practice Group
              <br />

              Discussions
              <span className="text-[#8F2945]">
                {" "}before you compete.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-7 max-w-3xl text-base leading-7 text-[#6B6863] sm:text-lg">

              Aurex is a Group Discussion practice platform built
              for students preparing for placements and interviews.
              Practice real-world GD topics, join live discussions,
              and build the confidence to think, speak and compete
              effectively.

            </p>


            {/* Buttons */}

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                href="/practice"
                className="rounded-lg bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]"
              >
                Start Practicing
              </Link>

              <Link
                href="/practice/live-challenge"
                className="rounded-lg border border-[#DCDCDC] bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition hover:border-[#8F2945] hover:text-[#8F2945]"
              >
                Join Live GD
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHAT IS AUREX ================= */}

      <section className="bg-[#FAFAF9] py-16 lg:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* LEFT */}

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
                What is Aurex?
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em]">
                A place to practice before the real GD.
              </h2>

              <p className="mt-6 leading-7 text-[#6B6863]">

                Group Discussions are an important part of many
                college placement and recruitment processes.
                However, students often don't get enough
                opportunities to practice in a realistic environment.

              </p>

              <p className="mt-5 leading-7 text-[#6B6863]">

                Aurex gives students a dedicated platform where
                they can practice GD topics, improve their
                communication skills and participate in live
                discussions with other students.

              </p>

              <p className="mt-5 leading-7 text-[#6B6863]">

                Whether you are attending your first GD or preparing
                for a competitive placement round, Aurex helps you
                practice step by step.

              </p>

            </div>


            {/* RIGHT */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Card 01 */}

              <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C9AAB4] hover:shadow-lg">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8F2945]/10 text-sm font-bold text-[#8F2945]">
                  01
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Practice
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#777]">
                  Practice realistic Group Discussion topics
                  at your own difficulty level.
                </p>

              </div>


              {/* Card 02 */}

              <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C9AAB4] hover:shadow-lg">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8F2945]/10 text-sm font-bold text-[#8F2945]">
                  02
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Prepare
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#777]">
                  Build communication, reasoning and
                  confidence for placement rounds.
                </p>

              </div>


              {/* Card 03 */}

              <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C9AAB4] hover:shadow-lg">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8F2945]/10 text-sm font-bold text-[#8F2945]">
                  03
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Compete
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#777]">
                  Join live discussions and experience
                  a realistic GD environment.
                </p>

              </div>


              {/* Card 04 */}

              <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C9AAB4] hover:shadow-lg">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8F2945]/10 text-sm font-bold text-[#8F2945]">
                  04
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Improve
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#777]">
                  Learn from every discussion and become
                  a stronger communicator.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="bg-white py-16 lg:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
              How Aurex Works
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em]">
              From practice to confidence.
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#6B6863]">
              Start with simple topics and gradually challenge
              yourself with more realistic placement-level GDs.
            </p>

          </div>


          {/* Steps */}

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {/* Step 1 */}

            <div className="relative rounded-2xl border border-[#E2E2E2] bg-[#FAFAF9] p-7">

              <span className="text-5xl font-bold text-[#8F2945]/15">
                01
              </span>

              <h3 className="mt-4 text-xl font-bold">
                Choose a Topic
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#777]">
                Select a Group Discussion topic based on
                your experience and difficulty level.
              </p>

            </div>


            {/* Step 2 */}

            <div className="relative rounded-2xl border border-[#E2E2E2] bg-[#FAFAF9] p-7">

              <span className="text-5xl font-bold text-[#8F2945]/15">
                02
              </span>

              <h3 className="mt-4 text-xl font-bold">
                Practice Your Ideas
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#777]">
                Think about the topic, organize your points
                and practice expressing your ideas clearly.
              </p>

            </div>


            {/* Step 3 */}

            <div className="relative rounded-2xl border border-[#E2E2E2] bg-[#FAFAF9] p-7">

              <span className="text-5xl font-bold text-[#8F2945]/15">
                03
              </span>

              <h3 className="mt-4 text-xl font-bold">
                Join the Discussion
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#777]">
                Enter a live GD, communicate with participants
                and experience the pressure of a real discussion.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="bg-[#FAFAF9] py-16 lg:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8F2945]">
              Built for Students
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em]">
              Everything you need to practice better.
            </h2>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {/* Feature 1 */}

            <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8F2945]/10 text-[#8F2945]">
                ✦
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Topic-Based Practice
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#777]">
                Explore beginner, intermediate and advanced
                GD topics and practice at your own pace.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8F2945]/10 text-[#8F2945]">
                ◉
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Live GD Challenges
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#777]">
                Join live discussions with other students
                and experience a realistic GD environment.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="rounded-2xl border border-[#E2E2E2] bg-white p-7">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8F2945]/10 text-[#8F2945]">
                ↗
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Placement Focused
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#777]">
                Practice the communication and reasoning
                skills that matter during placement rounds.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MISSION ================= */}

      <section className="bg-[#171717] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">

          <div className="max-w-4xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A9D]">
              Our Mission
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl">

              Give every student a place

              <span className="text-[#C98A9D]">
                {" "}to practice before
              </span>

              {" "}the real competition.

            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#999]">

              Aurex is built around a simple idea:
              students should have the opportunity to practice,
              make mistakes, learn and improve before facing
              the pressure of a real placement process.

            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="bg-[#FAFAF9] py-16">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="rounded-2xl bg-[#8F2945] px-8 py-12 text-white sm:px-12">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Start Your GD Journey
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Think. Prepare. Compete.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
              Practice Group Discussions, join live challenges
              and build the confidence you need for your next
              placement.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/practice"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#F1F1F1]"
              >
                Explore GD Topics
              </Link>

              <Link
                href="/practice/live-challenge"
                className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Join Live GD
              </Link>

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
            Group Discussion practice, built better.
          </p>

        </div>

      </footer>

    </main>
  );
}