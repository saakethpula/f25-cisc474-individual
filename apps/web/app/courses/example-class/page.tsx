import React from "react";
import Link from "next/link";
import "./class.css";
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
                <Link href="/dashboard"> Dashboard</Link>
                <Link href="/courses"> Courses</Link>
                <Link href="/messages"> Messages</Link>
                <Link href="/settings"> Settings</Link>
            </nav>
            <div className="mainContent">
                <h1 className="mainHeader">Example Course</h1>
                <p className="mainDescription">Welcome to the Example Course page.</p>
                <div className="coursesGrid">
                    <div className="courseSquare">
                        <Link href="/courses/example-class/assignment-1" className="assignmentLink">
                            View Assignment
                        </Link>
                    </div>
                    <div className="courseSquare">
                        <Link href="/courses/example-class/example-grades" className="assignmentLink">
                            View Grades
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CoursesPage;