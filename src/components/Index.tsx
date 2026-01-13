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
            }}
        >
            {/* BACKGROUND (ZOOM DI SINI, BUKAN DI PAGE) */}
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
                    backgroundColor: "rgba(0,0,0,0.45)",
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
                }}
            >
                <h1 style={titleStyle}>Undangan Pernikahan</h1>

                <h3 style={{ ...nameStyle, animationDelay: "0.3s" }}>
                    Pratu Randriano Dwi Mulyono
                    <br />
                    <span style={{ fontSize: 26, fontWeight: 600 }}>&</span>
                    <br />
                    Annisa Nur Afiifah
                </h3>

                <p style={{ ...dateStyle, animationDelay: "0.6s" }}>
                    Sabtu, 07 Februari 2025
                </p>

                <button
                    onClick={openInvitation}
                    style={buttonStyle}
                >
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
                    70% { box-shadow: 0 0 0 12px rgba(212,176,63,0); }
                    100% { box-shadow: 0 0 0 0 rgba(212,176,63,0); }
                }
            `}</style>
        </div>
    );
}

/* STYLES */
const titleStyle: React.CSSProperties = {
    fontSize: 42,
    fontWeight: 600,
    marginBottom: 16,
    animation: "fadeUp 1s ease forwards",
};

const nameStyle: React.CSSProperties = {
    fontSize: 40,
    fontWeight: 400,
    lineHeight: 1.6,
    marginBottom: 20,
    opacity: 0,
    animation: "fadeUp 1s ease forwards",
};

const dateStyle: React.CSSProperties = {
    fontSize: 20,
    marginBottom: 28,
    opacity: 0,
    animation: "fadeUp 1s ease forwards",
};

const buttonStyle: React.CSSProperties = {
    padding: "14px 40px",
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#d4b03f",
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    animation: "fadeUp 1s ease forwards, pulse 2s infinite",
    animationDelay: "0.9s",
    opacity: 0,
};
