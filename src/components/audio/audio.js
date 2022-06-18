import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ tracks }) => {
	// State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
    
    // Destructure for conciseness
    const { title, artist, color, image, audioSrc } = tracks[trackIndex];

	// Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

	// Destructure for conciseness
	const { duration } = audioRef.current;

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
          setTrackIndex(tracks.length - 1);
        } else {
          setTrackIndex(trackIndex - 1);
        }
      }
      
      const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
          setTrackIndex(trackIndex + 1);
        } else {
          setTrackIndex(0);
        }
      }
      useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }, [isPlaying]);т

	return ( 
    <div className="audio-player">
        <div className="track-info">
            <img
                className="artwork"
                src={image}
                alt={`track artwork for ${title} by ${artist}`}
        />
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
        </div>
    </div>);
}

export default AudioPlayer;