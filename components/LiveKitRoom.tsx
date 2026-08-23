"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  GridLayout,
  ParticipantTile,
  useTracks,
} from "@livekit/components-react";

import { Track } from "livekit-client";

import "@livekit/components-styles";

type Topic = {
  title: string;
  description: string | null;
  level: string;
};

type Props = {
  token: string;
  serverUrl: string;
  topic: Topic;
};

function MeetingLayout({ topic }: { topic: Topic }) {
  const tracks = useTracks([
    {
      source: Track.Source.Camera,
      withPlaceholder: false,
    },
  ]);

  return (
    <div className="flex h-screen flex-col bg-[#080808] text-white">

      {/* HEADER */}

      <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#242424] bg-[#101010] px-5">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8F2945] text-sm font-bold">
            A
          </div>

          <div>
            <p className="text-sm font-bold">
              Aurex
            </p>

            <p className="text-[10px] uppercase tracking-[0.16em] text-[#666]">
              Live GD
            </p>
          </div>

        </div>


        {/* TOPIC */}

        <div className="hidden max-w-xl flex-1 px-8 text-center md:block">

          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A85A70]">
            Discussion Topic
          </p>

          <h1 className="mt-1 truncate text-sm font-semibold">
            {topic.title}
          </h1>

          <p className="mt-1 text-[10px] text-[#666]">
            {topic.level} · 15 minute GD
          </p>

        </div>


        {/* STATUS */}

        <div className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#171717] px-3 py-2">

          <span className="h-2 w-2 animate-pulse rounded-full bg-[#8F2945]" />

          <span className="text-[10px] font-bold uppercase tracking-wider text-[#999]">
            Live
          </span>

        </div>

      </header>


      {/* VIDEO AREA */}

      <main className="min-h-0 flex-1 p-4">

        <div className="h-full overflow-hidden rounded-2xl border border-[#252525] bg-[#0f0f0f]">

          {tracks.length === 0 ? (

            <div className="flex h-full items-center justify-center">

              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1c1c1c] text-xl">
                  👥
                </div>

                <p className="mt-4 text-sm font-semibold">
                  Waiting for participants
                </p>

                <p className="mt-2 text-xs text-[#666]">
                  Turn on your camera to join the GD.
                </p>

              </div>

            </div>

          ) : (

            <GridLayout
              tracks={tracks}
              className="h-full p-3"
            >
              <ParticipantTile />
            </GridLayout>

          )}

        </div>

      </main>


      {/* CONTROLS */}

      <footer className="flex h-[82px] shrink-0 items-center justify-center border-t border-[#242424] bg-[#101010]">

        <div className="rounded-2xl border border-[#292929] bg-[#171717] px-4 py-2 shadow-xl">

          <ControlBar
            variation="minimal"
            controls={{
              microphone: true,
              camera: true,
              screenShare: true,
              chat: false,
              leave: true,
            }}
          />

        </div>

      </footer>


      {/* AUDIO */}

      <RoomAudioRenderer />

    </div>
  );
}


export default function LiveKitMeeting({
  token,
  serverUrl,
  topic,
}: Props) {

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-sm text-[#777]">
          Connecting to meeting...
        </p>
      </div>
    );
  }

  if (!serverUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-6 text-center">

          <p className="text-sm font-semibold text-red-400">
            LiveKit server URL is missing.
          </p>

          <p className="mt-2 text-xs text-[#777]">
            Check your NEXT_PUBLIC_LIVEKIT_URL environment variable.
          </p>

        </div>

      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      audio={true}
      video={true}
    >
      <MeetingLayout topic={topic} />
    </LiveKitRoom>
  );
}