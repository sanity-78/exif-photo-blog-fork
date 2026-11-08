'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx/lite';

const ALBUM_ID = '3283857706';
const ALBUM_URL = 'https://fredsounds.bandcamp.com/album/near-satiety-beach';
const ALBUM_TITLE = 'Near Satiety Beach';
const ARTIST = 'Fred Mug';

// Bandcamp can only be styled through URL colors, so match the site theme
const getEmbedUrl = (isDark: boolean) =>
  `https://bandcamp.com/EmbeddedPlayer/album=${ALBUM_ID}/size=large/` +
  `bgcol=${isDark ? '000000' : 'ffffff'}/` +
  `linkcol=${isDark ? 'a3a3a3' : '525252'}/` +
  'tracklist=false/artwork=small/transparent=true/';

export default function MusicPlayer() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  // The embed only exists after the first click, so nothing loads or plays
  // on page load. Once created it stays mounted so music keeps playing.
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <div className="fixed bottom-3 left-3 z-40 flex flex-col items-start gap-1.5">
      {hasOpened &&
        <div
          className={clsx(
            'rounded-md border p-1.5 shadow-sm',
            'bg-white border-neutral-200',
            'dark:bg-black dark:border-neutral-800',
            !isOpen && 'hidden',
          )}
        >
          <iframe
            title="Bandcamp player"
            src={getEmbedUrl(isDark)}
            width="350"
            height="120"
            loading="lazy"
            className="max-w-[calc(100vw-2.5rem)] border-0"
          />
          <a
            href={ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'block px-1 pt-1 text-xs',
              'text-neutral-500 hover:text-black',
              'dark:text-neutral-400 dark:hover:text-white',
            )}
          >
            {ALBUM_TITLE} — {ARTIST}
          </a>
        </div>}
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => {
          setHasOpened(true);
          setIsOpen(open => !open);
        }}
        className={clsx(
          'rounded-full border px-2.5 py-1 text-xs uppercase tracking-wider',
          'bg-white/80 text-neutral-500 border-neutral-200 backdrop-blur',
          'hover:text-black',
          'dark:bg-black/80 dark:text-neutral-400 dark:border-neutral-800',
          'dark:hover:text-white',
        )}
      >
        {isOpen ? 'Close' : '♪ Music'}
      </button>
    </div>
  );
}
