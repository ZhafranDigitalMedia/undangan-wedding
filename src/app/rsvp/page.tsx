"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAudio } from "../../components/AudioContext";
import bgWedding from "../../assets/gambar2mbanisa.jpeg";

export default function RSVPPage() {
    const router = useRouter();
    const { playMusic } = useAudio();

    const [nama, setNama] = useState("");
    const [jumlah, setJumlah] = useState<number | null>(null);
    const [status, setStatus] = useState("Hadir");

    // Reset jumlah jika tidak hadir
    useEffect(() => {
        if (status === "Tidak Hadir") setJumlah(null);
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        playMusic(); // pastikan musik tetap aktif

        try {
            await addDoc(collection(db, "rsvp"), {
                nama: nama.trim(),
                jumlah_tamu: status === "Hadir" ? jumlah ?? 0 : 0,
                kehadiran: status,
                waktu: serverTimestamp(),
            });

            alert("RSVP berhasil dikirim ❤️");

            setNama("");
            setJumlah(null);
            setStatus("Hadir");

            router.push("/wishes");
        } catch {
            alert("Gagal mengirim RSVP");
        }
    };

    return (
        <div
            onClick={playMusic}
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${bgWedding.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
            }}
        >
            {/* OVERLAY */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.45)",
                }}
            />

            {/* CONTENT */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "380px",
                        padding: "28px",
                        borderRadius: "16px",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                        }}
                    >
                        <h1
                            style={{
                                color: "white",
                                fontSize: "28px",
                                textAlign: "center",
                                marginBottom: "10px",
                            }}
                        >
                            Konfirmasi Kehadiran
                        </h1>

                        <input
                            placeholder="Nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                            style={inputStyle}
                        />

                        <input
                            type="number"
                            placeholder="Jumlah Tamu"
                            value={jumlah ?? ""}
                            onChange={(e) =>
                                setJumlah(
                                    e.target.value === "" ? null : Number(e.target.value)
                                )
                            }
                            disabled={status === "Tidak Hadir"}
                            style={inputStyle}
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={inputStyle}
                        >
                            <option>Hadir</option>
                            <option>Tidak Hadir</option>
                        </select>

                        <button type="submit" style={submitStyle}>
                            Kirim
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/wishes")}
                            style={linkStyle}
                        >
                            Ucapan & Doa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

/* STYLES */
const inputStyle: React.CSSProperties = {
    padding: "14px 16px",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    fontSize: "15px",
    outline: "none",
    color: "black",
};

const submitStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#d4b03f",
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
};

const linkStyle: React.CSSProperties = {
    marginTop: "6px",
    padding: "12px",
    textAlign: "center",
    borderRadius: "30px",
    backgroundColor: "white",
    color: "black",
    fontWeight: 500,
};
