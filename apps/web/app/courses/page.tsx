import React, { Suspense } from "react";
import Link from "next/link";
import "./courses.css";

type Course = {
    id: number;
    courseName: string;
};

async function getCourses(): Promise<Course[]> {
    const res = await fetch("https://f25-cisc474-individual-234i.onrender.com/course", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

const CoursesPage = async () => {
    const courses = await getCourses();

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
                <h1 className="mainHeader">Courses</h1>
                <p className="mainDescription">Welcome to the Courses page.</p>
                <Suspense fallback={<div>Loading courses...</div>}>
                    <div className="coursesGrid">
                        {courses.length === 0 ? (
                            <Link className="courseSquare" href="/courses/example-class"> Example Class</Link>
                        ) : (
                            courses.map((c) => (
                                <Link key={c.id} className="courseSquare" href={`/courses/${c.id}`}>
                                    {c.courseName}
                                </Link>
                            ))
                        )}
                    </div>
                </Suspense>
            </div>
        </main>
    );
};

export default CoursesPage;