import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
    url: string;
    play: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, play }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (play && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => {
                // Handle autoplay restrictions by logging the error
                console.log("Audio playback failed:", err);
            });
        }
    }, [play, url]);

    return (
        <audio ref={audioRef} src={url} preload="auto" style={{ display: 'none' }} />
    );
};

export default AudioPlayer;
