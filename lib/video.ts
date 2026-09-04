export type VideoProvider = "youtube" | "vimeo" | "bunny" | "unknown";

export type ParsedVideo = {
  provider: VideoProvider;
  embedUrl: string | null;
};

function parseYouTubeUrl(url: URL): string | null {
  if (url.hostname.includes("youtu.be")) {
    const id = url.pathname.replace("/", "").trim();
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (url.hostname.includes("youtube.com")) {
    if (url.pathname.startsWith("/embed/")) {
      return url.toString();
    }

    const id = url.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  return null;
}

function parseVimeoUrl(url: URL): string | null {
  if (!url.hostname.includes("vimeo.com")) {
    return null;
  }

  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts.at(-1);

  return id ? `https://player.vimeo.com/video/${id}` : null;
}

function parseBunnyUrl(url: URL): string | null {
  if (
    !url.hostname.includes("bunny.net") &&
    !url.hostname.includes("mediadelivery.net")
  ) {
    return null;
  }

  return url.toString();
}

export function parseVideoUrl(videoUrl?: string): ParsedVideo {
  if (!videoUrl) {
    return {
      provider: "unknown",
      embedUrl: null,
    };
  }

  try {
    const url = new URL(videoUrl);

    const youtube = parseYouTubeUrl(url);

    if (youtube) {
      return {
        provider: "youtube",
        embedUrl: youtube,
      };
    }

    const vimeo = parseVimeoUrl(url);

    if (vimeo) {
      return {
        provider: "vimeo",
        embedUrl: vimeo,
      };
    }

    const bunny = parseBunnyUrl(url);

    if (bunny) {
      return {
        provider: "bunny",
        embedUrl: bunny,
      };
    }

    return {
      provider: "unknown",
      embedUrl: null,
    };
  } catch {
    return {
      provider: "unknown",
      embedUrl: null,
    };
  }
}