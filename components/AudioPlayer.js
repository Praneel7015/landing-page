import React from 'react';

export default function AudioPlayer({ src, title }) {
  if (!src) return null;

  return (
    <div className="audio-player">
      <audio controls preload="metadata">
        <source src={src} />
        Your browser does not support the audio element.
      </audio>
      {title ? <div className="audio-meta">{title}</div> : null}
    </div>
  );
}
