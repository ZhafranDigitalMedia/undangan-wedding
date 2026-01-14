"use client";

import { useRef, useState } from "react";
import bgWedding from "../assets/gambar4mbanisa.jpeg";

export default function Index() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicPlayed, setMusicPlayed] = useState(false);
    const [closing, setClosing] = useState(false);

    const playMusicOnce = () => {
        if (!musicPlayed && audioRef.current) {
            audioRef.current.play().catch(() => { });
            setMusicPlayed(true);
        }
    };

    const openInvitation = () => {
        setClosing(true);
        setTimeout(() => {
            window.location.href = "/rsvp";
        }, 800);
    };

    return (
        <div
            onClick={playMusicOnce}
            style={{
                position: "fixed",
                inset: 0,
                overflow: "hidden",
                color: "white",
                fontFamily: "var(--font-playfair)",
            }}
        >
            {/* BACKGROUND */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${bgWedding.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    animation: "bgZoom 20s ease-in-out infinite",
                    transform: closing ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.8s ease",
                }}
            />

            {/* OVERLAY */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.55)",
                }}
            />

            {/* AUDIO */}
            <audio ref={audioRef} loop preload="auto">
                <source src="/music/until-i-found-you.mp3" type="audio/mpeg" />
            </audio>

            {/* CONTENT */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    opacity: closing ? 0 : 1,
                    transition: "opacity 0.6s ease",
                    padding: "0 20px",
                }}
            >
                <h1 style={titleStyle}>Undangan Pernikahan</h1>

                <h3 style={{ ...nameStyle, animationDelay: "0.3s" }}>
                    Pratu Randriano Dwi Mulyono
                    <br />
                    <span
                        style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: 28,
                            fontWeight: 500,
                        }}
                    >
                        &
                    </span>
                    <br />
                    Annisa Nur Afiifah
                </h3>

                <p style={{ ...dateStyle, animationDelay: "0.6s" }}>
                    Sabtu, 07 Februari 2025
                </p>

                <button onClick={openInvitation} style={buttonStyle}>
                    Buka Undangan
                </button>
            </div>

            {/* ANIMATION */}
            <style jsx>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes bgZoom {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(212,176,63,0.6); }
                    70% { box-shadow: 0 0 0 14px rgba(212,176,63,0); }
                    100% { box-shadow: 0 0 0 0 rgba(212,176,63,0); }
                }
            `}</style>
        </div>
    );
}

/* ================= STYLES ================= */

const titleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 18,
    animation: "fadeUp 1s ease forwards",
    fontFamily: "var(--font-playfair)",
    letterSpacing: "2px",
};

const nameStyle: React.CSSProperties = {
    fontSize: 58,
    fontWeight: 400,
    lineHeight: 1.2,
    marginBottom: 20,
    opacity: 0,
    animation: "fadeUp 1s ease forwards",
    fontFamily: "var(--font-vibes)", // INI KUNCI UNDANGAN
};

const dateStyle: React.CSSProperties = {
    fontSize: 18,
    marginBottom: 32,
    opacity: 0,
    animation: "fadeUp 1s ease forwards",
    fontFamily: "var(--font-playfair)",
    letterSpacing: "1px",
};

const buttonStyle: React.CSSProperties = {
    padding: "14px 44px",
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#d4b03f",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    animation: "fadeUp 1s ease forwards, pulse 2s infinite",
    animationDelay: "0.9s",
    opacity: 0,
    fontFamily: "var(--font-playfair)",
    letterSpacing: "1px",
};
