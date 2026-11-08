'use client';

import { useState } from 'react';
import { clsx } from 'clsx/lite';

const ALBUM_URL = 'https://fredsounds.bandcamp.com/album/near-satiety-beach';

// Bandcamp embed (no autoplay parameter, so it only plays when clicked)
const EMBED_URL =
  'https://bandcamp.com/EmbeddedPlayer/album=3283857706/size=large/' +
  'bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/';

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  // The embed is only created after the first click, so nothing loads or
  // plays on page load. Once created it stays mounted so music keeps playing.
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <div className="fixed bottom-3 left-3 z-40 flex flex-col items-start gap-2">
      {hasOpened &&
        <div className={clsx(!isOpen && 'hidden')}>
          <iframe
            title="Bandcamp player"
            src={EMBED_URL}
            width="350"
            height="120"
            loading="lazy"
            className="max-w-[calc(100vw-1.5rem)] border-0"
          />
          <a
            href={ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'mt-1 inline-block rounded px-2 py-1 text-xs',
              'bg-white text-black dark:bg-black dark:text-white',
            )}
          >
            Near Satiety Beach by Fred Mug
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
