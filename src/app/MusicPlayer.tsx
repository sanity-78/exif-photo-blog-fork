'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx/lite';

const ALBUM_ID = '3283857706';
const ALBUM_URL = 'https://fredsounds.bandcamp.com/album/near-satiety-beach';
const ALBUM_TITLE = 'Near Satiety Beach';
const ARTIST = 'Fred Mug';

// Bandcamp track IDs: Set Aside, Abide, Freight, Organismism,
// Satiety Beach, Observatory
const TRACK_IDS = [
  '3983104781',
  '3448645612',
  '634055200',
  '54582703',
  '2027596700',
  '2048994919',
];

// Screens at least this wide get the player open by default
const OPEN_BY_DEFAULT_MIN_WIDTH = 768;

// Fixed colors: the address never changes, so switching the site theme
// does not reload the embed or interrupt playback
const getEmbedUrl = (trackId: string) =>
  `https://bandcamp.com/EmbeddedPlayer/album=${ALBUM_ID}/size=large/` +
  'bgcol=000000/linkcol=a3a3a3/tracklist=false/artwork=small/' +
  `track=${trackId}/transparent=true/`;

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  // The embed only exists once it has been opened, so nothing loads on
  // phones until a visitor taps the button. Once created it stays mounted
  // so music keeps playing while the card is hidden.
  const [hasOpened, setHasOpened] = useState(false);
  // Random starting track, chosen once per page load in the browser
  const [trackId, setTrackId] = useState<string | undefined>();

  useEffect(() => {
    setTrackId(TRACK_IDS[Math.floor(Math.random() * TRACK_IDS.length)]);
    if (window.matchMedia(
      `(min-width: ${OPEN_BY_DEFAULT_MIN_WIDTH}px)`,
    ).matches) {
      setIsOpen(true);
      setHasOpened(true);
    }
  }, []);

  return (
    <div className="fixed bottom-3 left-3 z-40 flex flex-col items-start gap-1.5">
      {hasOpened && trackId &&
        <div
          className={clsx(
            'rounded-md border p-1.5 shadow-sm',
            'bg-black border-neutral-800',
            !isOpen && 'hidden',
          )}
        >
          <iframe
            title="Bandcamp player"
            src={getEmbedUrl(trackId)}
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
              'text-neutral-400 hover:text-white',
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
