import Link from "next/link";
import React from "react";

export default function SettingsPage() {
    return (
        <main>
            <h1 style={{ textAlign: "center", color: "#383838", background: "#b6fff9ff" }}>Login</h1>
            <p style={{ textAlign: "center", color: "#383838" }}>Please enter your credentials to log in.</p>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                <input style={{ marginBottom: "1rem", padding: "0.5rem", fontSize: "1rem" }}
                    type="text"
                    placeholder="Username"
                />
                <input style={{ marginBottom: "1rem", padding: "0.5rem", fontSize: "1rem" }}
                    type="password"
                    placeholder="Password"
                />
                <Link
                    href="/dashboard"
                    style={{
                        padding: '0.5rem .5rem',
                        background: '#383838',
                        borderRadius: '4px',
                        fontSize: '1rem',
                    }}
                    aria-label="Login"
                >
                    Login
                </Link>
            </form>
        </main>
    );
}

