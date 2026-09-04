export function formatTimestamp(totalSeconds: number): string {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;
  
    if (hours > 0) {
      return [hours, minutes, seconds]
        .map((value, index) =>
          index === 0 ? String(value) : String(value).padStart(2, "0"),
        )
        .join(":");
    }
  
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }
  
  export function lessonHref(
    slug: string,
    startSeconds?: number,
  ): string {
    const baseHref = `/lessons/${slug}`;
  
    if (!startSeconds || startSeconds <= 0) {
      return baseHref;
    }
  
    return `${baseHref}?t=${Math.floor(startSeconds)}`;
  }