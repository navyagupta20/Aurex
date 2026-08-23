"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid email or password");
      return;
    }

    window.location.href = "/";
  }

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

          <Link
            href="/"
            className="text-sm font-medium text-[#6B6863] transition hover:text-[#8F2945]"
          >
            ← Back to Home
          </Link>

        </div>

      </nav>


      {/* ================= SIGN IN ================= */}

      <section className="relative flex min-h-[calc(100vh-81px)] items-center justify-center overflow-hidden px-6 py-16">

        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full border border-[#E2E2E2]" />

        <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-[#8F2945]/5" />


        <div className="relative w-full max-w-md">

          {/* ================= TITLE ================= */}

          <div className="text-center">

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.05em]">

              Sign in to{" "}

              <span className="text-[#8F2945]">
                Aurex
              </span>

            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#6B6863]">
              Continue your placement preparation journey.
            </p>

          </div>


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl border border-[#E2E2E2] bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.05)]"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#171717]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-lg border border-[#DCDCDC] bg-[#FAFAF9] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-[#A5A5A5] focus:border-[#8F2945] focus:ring-2 focus:ring-[#8F2945]/10"
              />

            </div>


            {/* PASSWORD */}

            <div className="mt-5">

              <div className="flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-[#171717]"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-[#8F2945] transition hover:text-[#171717]"
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-2 w-full rounded-lg border border-[#DCDCDC] bg-[#FAFAF9] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-[#A5A5A5] focus:border-[#8F2945] focus:ring-2 focus:ring-[#8F2945]/10"
              />

            </div>


            {/* SIGN IN BUTTON */}

            <button
              type="submit"
              className="mt-7 w-full rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8F2945]"
            >
              Sign In
            </button>


            {/* DIVIDER */}

            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#E5E5E5]" />

              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#999]">
                Aurex
              </span>

              <div className="h-px flex-1 bg-[#E5E5E5]" />

            </div>


            {/* CREATE ACCOUNT */}

            <p className="text-center text-xs text-[#777]">

              New to Aurex?{" "}

              <Link
                href="/signup"
                className="font-semibold text-[#8F2945] transition hover:text-[#171717]"
              >
                Create an account
              </Link>

            </p>

          </form>


          <p className="mt-7 text-center text-xs text-[#999]">
            Practice. Prepare. Compete.
          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#E5E5E5] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

          <p className="text-xs font-bold">
            Aurex
          </p>

          <p className="text-xs text-[#999]">
            Placement preparation, built better.
          </p>

        </div>

      </footer>

    </main>
  );
}