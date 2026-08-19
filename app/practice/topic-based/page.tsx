export default function TopicBased() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Topic-Based Practice
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Choose Your Level
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Select a level that matches your current group
            discussion preparation.
          </p>

        </div>


        {/* Level Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">


          {/* Beginner */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Level 01
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Beginner
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Start with simple and familiar topics to build
              confidence and learn the basics of GD participation.
            </p>

            <a
  href="/practice/topic-based/beginner"
  className="mt-7 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-slate-950"
>
  Select Beginner
</a>

          </div>


          {/* Intermediate */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Level 02
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Intermediate
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Practice analytical topics and improve your
              communication, arguments, and responses.
            </p>

            <button className="mt-7 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950">
              Select Intermediate
            </button>

          </div>


          {/* Advanced */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Level 03
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Advanced
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Challenge yourself with complex topics similar
              to placement-level group discussions.
            </p>

            <button className="mt-7 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950">
              Select Advanced
            </button>

          </div>


        </div>

      </div>

    </main>
  );
}