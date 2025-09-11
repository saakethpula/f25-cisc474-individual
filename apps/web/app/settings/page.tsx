import React from "react";
import Link from "next/link";
export default function SettingsPage() {
    return (
        <main>
            <nav
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    position: 'fixed',
                    left: '2rem',
                    top: '5rem',
                    zIndex: 1000,
                    backgroundColor: "white",
                    color: "#383838",
                }}
            >
                <Link href="/dashboard" style={{ background: "#b6fff9ff", borderRadius: "20%", border: "1px solid gray" }}>Dashboard</Link>
                <Link href="/courses" style={{ background: "#b6fff9ff", borderRadius: "20%", border: "1px solid gray" }}>Courses</Link>
                <Link href="/messages" style={{ background: "#b6fff9ff", borderRadius: "20%", border: "1px solid gray" }}>Messages</Link>
                <Link href="/settings" style={{ background: "#b6fff9ff", borderRadius: "20%", border: "1px solid gray" }}>Settings</Link>
            </nav>
            <h1 style={{ textAlign: "center", color: "#383838", background: "#b6fff9ff" }}>Settings</h1>
            <p style={{ textAlign: "center", color: "#383838" }}>Manage your application settings here.</p>
        </main>
    );
}