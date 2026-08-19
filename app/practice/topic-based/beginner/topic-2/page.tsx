import Link from "next/link";

export default function BeginnerTopicTwo() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-4xl">

        {/* Level */}

        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Beginner • Topic 02
        </p>


        {/* Topic */}

        <h1 className="mt-5 text-4xl font-bold">
          Should Students Use Smartphones in College?
        </h1>

        <p className="mt-6 leading-8 text-slate-400">
          Discuss how smartphones can help students in their
          studies and the problems they may create.
        </p>


        {/* Before You Start */}

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold">
            Before You Start
          </h2>

          <div className="mt-6 space-y-3 text-slate-400">

            <p>
              • Think about the educational benefits of smartphones.
            </p>

            <p>
              • Consider how smartphones can distract students.
            </p>

            <p>
              • Give examples from student life.
            </p>

            <p>
              • Explain your opinion clearly with supporting points.
            </p>

          </div>


          {/* Start GD */}

          <Link
            href="/practice/topic-based/beginner/topic-2/session"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-slate-950"
          >
            Start GD
          </Link>

        </div>

      </div>

    </main>
  );
}