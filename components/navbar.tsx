"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1F1F1F] bg-[#050505]/95 backdrop-blur-md">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}

        <a
          href="/"
          className="font-heading text-xl font-semibold tracking-[0.08em] text-[#F5E9E2]"
        >
          AUREX
        </a>


        {/* DESKTOP NAV */}

        <div className="hidden items-center gap-9 md:flex">

          <a
            href="/"
            className="text-sm text-[#F5E9E2] transition hover:text-[#A83252]"
          >
            Home
          </a>

          <a
            href="/practice"
            className="text-sm text-[#999999] transition hover:text-[#A83252]"
          >
            Practice
          </a>

          <a
            href="#about"
            className="text-sm text-[#999999] transition hover:text-[#A83252]"
          >
            About
          </a>

        </div>


        {/* RIGHT SIDE */}

        <div className="hidden items-center gap-6 md:flex">

          <button className="text-sm font-medium text-[#B8B8B8] transition hover:text-white">
            Sign In
          </button>

          <a
            href="/practice"
            className="rounded-lg bg-[#8F2945] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#A83252]"
          >
            Start Practicing
          </a>

        </div>


        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#F5E9E2]"
          aria-label="Open menu"
        >
          {menuOpen ? (
            <span className="text-2xl">×</span>
          ) : (
            <div className="space-y-1.5">
              <span className="block h-px w-6 bg-[#F5E9E2]" />
              <span className="block h-px w-6 bg-[#F5E9E2]" />
              <span className="block h-px w-6 bg-[#F5E9E2]" />
            </div>
          )}
        </button>

      </div>


      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="border-t border-[#1F1F1F] bg-[#050505] px-6 py-5 md:hidden">

          <div className="flex flex-col gap-1">

            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm text-[#F5E9E2] hover:bg-[#101010]"
            >
              Home
            </a>

            <a
              href="/practice"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm text-[#999999] hover:bg-[#101010] hover:text-[#F5E9E2]"
            >
              Practice
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm text-[#999999] hover:bg-[#101010] hover:text-[#F5E9E2]"
            >
              About
            </a>

            <div className="my-3 h-px bg-[#1F1F1F]" />

            <button className="rounded-md px-3 py-3 text-left text-sm text-[#B8B8B8] hover:bg-[#101010] hover:text-white">
              Sign In
            </button>

            <a
              href="/practice"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-[#8F2945] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#A83252]"
            >
              Start Practicing
            </a>

          </div>

        </div>
      )}

    </nav>
  );
}