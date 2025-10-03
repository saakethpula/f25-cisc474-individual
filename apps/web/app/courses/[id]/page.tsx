"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "../courses.css";

type Assignment = {
    id: number;
    assignmentTitle: string;
    description?: string;
    dueDate: string;
    courseId: number;
};

type Course = {
    id: number;
    courseName: string;
};

function CourseAssignments({ courseId }: { courseId: string }) {
    const [assignments, setAssignments] = useState<Assignment[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(`https://f25-cisc474-individual-234i.onrender.com/assignment`, { signal: controller.signal });
                if (!res.ok) throw new Error(`Failed to fetch assignments: ${res.status} ${res.statusText}`);
                const data: Assignment[] = await res.json();
                if (mounted) setAssignments(data.filter((a) => String(a.courseId) === courseId));
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
    }, [courseId]);

    if (loading) return <div>Loading assignments...</div>;
    if (error) return <div className="coursesGrid"><p className="error">Error loading assignments: {error}</p></div>;
    if (!assignments || assignments.length === 0) {
        return (
            <div className="coursesGrid">
                <div className="courseSquare">
                    <p>No assignments yet</p>
                </div>
            </div>
        );
    }

    return (
        <div className="coursesGrid">
            {assignments.map((a) => (
                <div key={a.id} className="courseSquare">
                    <Link href={`/courses/${courseId}/assignment-${a.id}`} className="assignmentLink">
                        {a.assignmentTitle}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default function CoursePage() {
    const params = useParams();
    const id = params?.id as string | undefined;

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        let mounted = true;
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(`https://f25-cisc474-individual-234i.onrender.com/course/${id}`, { signal: controller.signal });
                if (!res.ok) throw new Error(`Failed to fetch course: ${res.status} ${res.statusText}`);
                const data: Course = await res.json();
                if (mounted) setCourse(data);
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
    }, [id]);

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
                <h1 className="mainHeader">{loading ? 'Loading...' : course?.courseName ?? 'Course'}</h1>
                <p className="mainDescription">{loading ? 'Loading course...' : `Welcome to the ${course?.courseName ?? 'course'} page.`}</p>

                {id ? <CourseAssignments courseId={id} /> : <p className="error">Missing course id</p>}
                {error && <p className="error">Error loading course: {error}</p>}
            </div>
        </main>
    );
}
