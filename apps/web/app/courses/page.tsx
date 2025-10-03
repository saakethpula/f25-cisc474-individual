"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./courses.css";

type Course = {
    id: number;
    courseName: string;
};

function CoursesList() {
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch("https://f25-cisc474-individual-234i.onrender.com/course", {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status} ${res.statusText}`);
                const data: Course[] = await res.json();
                if (mounted) setCourses(data);
            } catch (err: unknown) {
                const e = err as { name?: string; message?: string };
                if (e.name === 'AbortError') return;
                if (mounted) setError(e.message ?? String(err));
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
            controller.abort();
        };
    }, []);

    if (loading) return <div className="fallback">Loading courses...</div>;
    if (error) return <div className="coursesGrid"><p className="error">Error loading courses: {error}</p></div>;
    if (!courses || courses.length === 0) return <div className="coursesGrid"><p>No courses</p></div>;

    return (
        <div className="coursesGrid">
            {courses.map((c) => (
                <Link key={c.id} className="courseSquare" href={`/courses/${c.id}`}>
                    {c.courseName}
                </Link>
            ))}
        </div>
    );
}

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
                <h1 className="mainHeader">Courses</h1>
                <p className="mainDescription">Welcome to the Courses page.</p>
                <CoursesList />
            </div>
        </main>
    );
};

export default CoursesPage;