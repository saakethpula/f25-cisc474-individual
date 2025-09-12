import React from "react";
import Link from "next/link";
import "./messages.css";
export default function MessagesPage() {
    return (

        <main className="messagesContainer">
            <nav className="leftNav">
                <Link
                    href="/"
                    className="loginBtn"
                    aria-label="Login"
                >
                    :)
                </Link>
                <Link href="/dashboard"> Dashboard</Link>
                <Link href="/courses"> Courses</Link>
                <Link href="/messages"> Messages</Link>
                <Link href="/settings"> Settings</Link>
            </nav>
            <div className="mainContent">
                <h1 className="mainHeader">Messages</h1>
                <p className="mainDescription">This is the messages page.</p>
            </div>
        </main>
    );
}