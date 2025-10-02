import React from "react";
import Link from "next/link";
import "./settings.css";
export default function SettingsPage() {
    return (
        <main className="settingsContainer">
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
                <h1 className="mainHeader">Settings</h1>
                <p className="mainDescription">Manage your application settings here.</p>
                                <div className="assignmentLinkText">
                    Messages Page with Access to the Backend:
                    <a className="assignmentLink" href="https://f25-cisc474-individual-web-chi.vercel.app/messages">
                         https://f25-cisc474-individual-web-chi.vercel.app/messages
                    </a>
                </div>
                <div className="assignmentLinkText">
                    Courses Page with Access to the Backend: 
                    <a className="assignmentLink" href="https://f25-cisc474-individual-web-chi.vercel.app/courses">
                        https://f25-cisc474-individual-web-chi.vercel.app/courses
                    </a>
                </div>
                <div className="assignmentLinkText">Clicking on a course will show you the assignments for that class from the backend</div>

            </div>
            
        </main>
    );
}