"use client";

import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext<any>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playMusic = () => {
        if (audioRef.current && !isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <AudioContext.Provider value={{ playMusic, isPlaying }}>
            <audio
                ref={audioRef}
                src="/music/until-i-found-you.mp3"
                loop
                preload="auto"
            />
            {children}
        </AudioContext.Provider>
    );
}

export const useAudio = () => useContext(AudioContext);
