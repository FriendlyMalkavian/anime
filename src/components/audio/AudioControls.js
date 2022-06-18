import React from 'react';
import { ReactComponent as Play } from './assets/play.svg';
import { ReactComponent as Pause } from './assets/pause.svg';
import { ReactComponent as Next } from './assets/next.svg';
import { ReactComponent as Prev } from './assets/prev.svg';

const AudioControls = ({
    isPlaying,
      onPlayPauseClick,
    onPrevClick,
    onNextClick,
  })  => {
      return (
    <div className="audio-player">
        <div className="track-info">
          <img
            className="artwork"
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
        <h2>{title}</h2>
        <h3>{artist}</h3>
            <AudioControls
      isPlaying={isPlaying}
      onPrevClick={toPrevTrack}
      onNextClick={toNextTrack}
      onPlayPauseClick={setIsPlaying}
    />
        </div>
    </div>
);
}