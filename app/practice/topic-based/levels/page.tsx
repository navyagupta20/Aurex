export default function TopicBasedLevels() {
  const levels = [
    {
      name: "Beginner",
      description:
        "Start with familiar and straightforward topics to build confidence.",
      href: "/practice/topic-based/levels/beginner",
    },
    {
      name: "Intermediate",
      description:
        "Practice analytical and opinion-based topics that require stronger reasoning.",
      href: "/practice/topic-based/levels/intermediate",
    },
    {
      name: "Advanced",
      description:
        "Challenge yourself with complex placement-oriented GD topics.",
      href: "/practice/topic-based/levels/advanced",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#8F2945]">
            Topic-Based Practice
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Choose Your Level
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#A6A6A6]">
            Choose a difficulty level based on your current GD
            preparation and start practicing.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {levels.map((level) => (
            <a
              key={level.name}
              href={level.href}
              className="group rounded-2xl border border-[#242424] bg-[#101010] p-7 transition hover:border-[#8F2945] hover:bg-[#151515]"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-[#666666]">
                Practice Level
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {level.name}
              </h2>

              <p className="mt-4 leading-7 text-[#A6A6A6]">
                {level.description}
              </p>

              <div className="mt-7 text-sm font-semibold text-[#8F2945] transition group-hover:text-[#A83252]">
                Explore Topics →
              </div>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}