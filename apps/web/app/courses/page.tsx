import React from "react";
import Link from "next/link";
import "./courses.css";
const CoursesPage = () => {
    return (
        <main className="coursesContainer">
            <nav className="leftNav">
                <Link
                    href="/"
                    className="loginBtn"
                    aria-label="Login"
                >
                    :)
                </Link>
                <Link href="/dashboard">‎ Dashboard</Link>
                <Link href="/courses">‎ Courses</Link>
                <Link href="/messages">‎ Messages</Link>
                <Link href="/settings">‎ Settings</Link>
            </nav>
            <div className="mainContent">
                <h1 className="mainHeader">Courses</h1>
                <p className="mainDescription">Welcome to the Courses page.</p>
            </div>

        </main>
    );
};

export default CoursesPage;