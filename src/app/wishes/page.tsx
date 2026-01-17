"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAudio } from "../../components/AudioContext";
import bgWedding from "../../assets/bunga1.jpg";

interface Wish {
    id: string;
    nama: string;
    hubungan: string;
    pesan: string;
}

export default function WishesPage() {
    const router = useRouter();
    const { playMusic } = useAudio();

    const [nama, setNama] = useState("");
    const [hubungan, setHubungan] = useState("");
    const [pesan, setPesan] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);

    // 🔥 Realtime Firestore
    useEffect(() => {
        const q = query(
            collection(db, "wishes"),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (snap) => {
            const data: Wish[] = snap.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Wish, "id">),
            }));
            setWishes(data);
        });

        return () => unsub();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        playMusic(); // pastikan musik tetap aktif

        try {
            await addDoc(collection(db, "wishes"), {
                nama: nama.trim(),
                hubungan: hubungan.trim(),
                pesan: pesan.trim(),
                createdAt: serverTimestamp(),
            });

            setNama("");
            setHubungan("");
            setPesan("");

            // scroll halus ke atas biar kelihatan ucapan terbaru
            window.scrollTo({ top: 0, behavior: "smooth" });
            router.push("/");
        } catch (error) {
            console.error(error);
            alert("Gagal mengirim ucapan");
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
                position: "relative",
            }}
        >
            {/* Overlay */}
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
                    maxWidth: "420px",
                    margin: "0 auto",
                    padding: "24px 16px",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <h2
                    style={{
                        color: "#d4b03f",
                        textAlign: "center",
                        marginBottom: "20px",
                        fontSize: "28px",
                    }}
                >
                    Ucapan & Doa
                </h2>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        padding: "20px",
                        borderRadius: "14px",
                        marginBottom: "24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <input
                        placeholder="Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        placeholder="Teman / Keluarga"
                        value={hubungan}
                        onChange={(e) => setHubungan(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <textarea
                        placeholder="Ucapan"
                        value={pesan}
                        onChange={(e) => setPesan(e.target.value)}
                        required
                        rows={3}
                        style={{ ...inputStyle, resize: "none" }}
                    />
                    <button type="submit" style={buttonStyle}>
                        Kirim Ucapan
                    </button>
                </form>

                {/* LIST UCAPAN */}
                {wishes.map((w) => (
                    <div
                        key={w.id}
                        style={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            padding: "16px",
                            borderRadius: "12px",
                            marginBottom: "12px",
                            color: "white",
                        }}
                    >
                        <strong>{w.nama}</strong>{" "}
                        <span style={{ opacity: 0.8 }}>
                            ({w.hubungan})
                        </span>
                        <p style={{ marginTop: "8px", marginBottom: 0 }}>
                            {w.pesan}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* STYLES */
const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#d4b03f",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
};
