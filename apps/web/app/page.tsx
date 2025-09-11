import Link from "next/link";
import React from "react";
import "./globals.css"
export default function LoginPage() {
    return (
        <main>
            <h1 className="loginHeader">Login</h1>
            <p className="loginSubtext">Please enter your credentials to log in.</p>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                <input className="textInput"
                    type="text"
                    placeholder="Username"
                />
                <input className="textInput"
                    type="password"
                    placeholder="Password"
                />
                <Link
                    href="/dashboard"
                    className="button"
                    aria-label="Login"
                >
                    Login
                </Link>
            </form>
        </main>
    );
}

