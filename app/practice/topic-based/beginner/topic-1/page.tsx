export default function TopicOne() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">

      <div className="mx-auto max-w-3xl">

        {/* Level */}
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Beginner Level • Topic 01
        </p>

        {/* Topic */}
        <h1 className="mt-4 text-4xl font-bold leading-tight">
          Is Social Media Good or Bad for Students?
        </h1>

        {/* Description */}
        <p className="mt-6 leading-7 text-slate-400">
          Discuss the positive and negative effects of social media
          on students. Consider its impact on education, communication,
          productivity, and social life.
        </p>


        {/* Preparation Section */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="text-2xl font-bold">
            Prepare for Your GD
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Take a few moments to organize your thoughts before
            starting the discussion.
          </p>


          {/* Preparation Tips */}
          <div className="mt-6 space-y-3 text-sm text-slate-400">

            <p>✓ Think about both sides of the topic.</p>

            <p>✓ Prepare 2–3 clear points.</p>

            <p>✓ Support your points with examples.</p>

            <p>✓ Be respectful when responding to others.</p>

          </div>


          {/* Session Information */}
          <div className="mt-8 rounded-xl border border-slate-800 p-5">

            <p className="text-sm text-slate-500">
              Discussion Duration
            </p>

            <p className="mt-2 text-xl font-semibold">
              15 Minutes
            </p>

          </div>


          {/* Start Button */}
          <a
  href="/practice/topic-based/beginner/topic-1/session"
  className="mt-8 block w-full rounded-lg bg-white px-6 py-3 text-center font-semibold text-slate-950"
>
  Start GD
</a>

        </div>

      </div>

    </main>
  );
}