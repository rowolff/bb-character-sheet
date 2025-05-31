import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
    sounds: {
        [key: string]: {
            url: string;
            play: boolean;
        }
    };
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ sounds }) => {
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

    useEffect(() => {
        // Check each sound and play if needed
        Object.entries(sounds).forEach(([soundKey, soundData]) => {
            if (soundData.play && audioRefs.current[soundKey]) {
                const audioElement = audioRefs.current[soundKey];
                if (audioElement) {
                    audioElement.currentTime = 0;
                    audioElement.play().catch(err => {
                        console.log(`Audio playback failed for ${soundKey}:`, err);
                    });
                }
            }
        });
    }, [sounds]);

    return (
        <>
            {Object.entries(sounds).map(([soundKey, soundData]) => (
                <audio
                    key={soundKey}
                    ref={el => audioRefs.current[soundKey] = el}
                    src={soundData.url}
                    preload="auto"
                    style={{ display: 'none' }}
                />
            ))}
        </>
    );
};

export default AudioPlayer;
