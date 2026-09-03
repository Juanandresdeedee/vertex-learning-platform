"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";

import { parseVideoUrl } from "@/lib/video";

type LessonVideoPlayerProps = {
  videoUrl?: string;
  posterUrl?: string;
  title: string;
  startSeconds?: number;
};

function withPlaybackParams(
  embedUrl: string,
  provider: "youtube" | "vimeo" | "bunny" | "unknown",
  startSeconds = 0,
): string {
  const url = new URL(embedUrl);

  if (provider === "youtube") {
    url.searchParams.set("autoplay", "1");

    if (startSeconds > 0) {
      url.searchParams.set("start", String(Math.floor(startSeconds)));
    }
  }

  if (provider === "vimeo") {
    url.searchParams.set("autoplay", "1");

    if (startSeconds > 0) {
      url.hash = `t=${Math.floor(startSeconds)}s`;
    }
  }

  if (provider === "bunny") {
    url.searchParams.set("autoplay", "true");

    if (startSeconds > 0) {
      url.searchParams.set("t", String(Math.floor(startSeconds)));
    }
  }

  return url.toString();
}

export function LessonVideoPlayer({
  videoUrl,
  posterUrl,
  title,
  startSeconds = 0,
}: LessonVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const parsedVideo = useMemo(() => parseVideoUrl(videoUrl), [videoUrl]);

  const playbackUrl = useMemo(() => {
    if (!parsedVideo.embedUrl) {
      return null;
    }

    return withPlaybackParams(
      parsedVideo.embedUrl,
      parsedVideo.provider,
      startSeconds,
    );
  }, [parsedVideo, startSeconds]);

  if (!playbackUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-neutral-950 px-6 text-center">
        <p className="text-sm text-neutral-300">
          Video unavailable for this lesson.
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-950">
      {isPlaying ? (
        <iframe
          src={playbackUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}

          <div className="absolute inset-0 bg-black/25" />

          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg transition-transform hover:scale-105"
            aria-label={`Play ${title}`}
          >
            <PlayIcon className="ml-1 h-7 w-7" />
          </button>
        </>
      )}
    </div>
  );
}