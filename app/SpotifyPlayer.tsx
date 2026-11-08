'use client';

import { useState } from 'react';
import { clsx } from 'clsx/lite';

// Playlist embed (override with NEXT_PUBLIC_SPOTIFY_EMBED_URL if needed)
const EMBED_URL = process.env.NEXT_PUBLIC_SPOTIFY_EMBED_URL ||
  'https://open.spotify.com/embed/playlist/73fiRF5aC7DsrF2BXLUl7e' +
  '?utm_source=generator';

// Autoplay is blocked unless NEXT_PUBLIC_SPOTIFY_AUTOPLAY = 1
const ALLOW_AUTOPLAY = process.env.NEXT_PUBLIC_SPOTIFY_AUTOPLAY === '1';

const ALLOW_BASE =
  'clipboard-write; encrypted-media; fullscreen; picture-in-picture';
const ALLOW = ALLOW_AUTOPLAY ? `autoplay; ${ALLOW_BASE}` : ALLOW_BASE;

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  // Embed is only created after the first click, so nothing loads or plays
  // on page load. Once created, it stays mounted so music keeps playing.
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <div className="fixed bottom-3 left-3 z-40 flex flex-col items-start gap-2">
      {hasOpened &&
        <iframe
          title="Spotify player"
          src={EMBED_URL}
          width="300"
          height="152"
          loading="lazy"
          allow={ALLOW}
          className={clsx(
            'max-w-[calc(100vw-1.5rem)] rounded-xl',
            !isOpen && 'hidden',
          )}
        />}
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => {
          setHasOpened(true);
          setIsOpen(open => !open);
        }}
        className={clsx(
          'rounded-full border px-3 py-1.5 text-sm shadow-sm',
          'bg-white text-black border-gray-300',
          'dark:bg-black dark:text-white dark:border-gray-700',
        )}
      >
        {isOpen ? 'Close music' : '♪ Music'}
      </button>
    </div>
  );
}
