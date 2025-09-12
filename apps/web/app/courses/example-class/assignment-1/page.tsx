import React from "react";
import Link from "next/link";
import "../class.css";

const Assignment1Start = () => {
    return (
        <main className="coursesContainer">
            <nav className="leftNav">
                <Link href="/" className="loginBtn" aria-label="Login">:)</Link>
                <Link href="/dashboard"> Dashboard</Link>
                <Link href="/courses"> Courses</Link>
                <Link href="/messages"> Messages</Link>
                <Link href="/settings"> Settings</Link>
            </nav>
            <div className="mainContent">
                <h1 className="mainHeader">Assignment 1</h1>
                <div className="coursesGrid">
                    <Link href="/courses/example-class/assignment-1/q1">
                        <button className="courseSquare">
                            Start Assignment
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Assignment1Start;
