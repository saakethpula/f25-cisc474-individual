import React from "react";
import Link from "next/link";
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

async function getCourse(id: string): Promise<Course | null> {
    const res = await fetch(`https://f25-cisc474-individual-234i.onrender.com/course/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
}

async function getAssignments(): Promise<Assignment[]> {
    const res = await fetch(`https://f25-cisc474-individual-234i.onrender.com/assignment`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

export default async function CoursePage({ params }: { params: { id: string } }) {
    const [course, assignments] = await Promise.all([getCourse(params.id), getAssignments()]);

    const courseAssignments = assignments.filter((a) => String(a.courseId) === params.id);

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
                <h1 className="mainHeader">{course?.courseName ?? "Course"}</h1>
                <p className="mainDescription">Welcome to the {course?.courseName ?? "course"} page.</p>

                <div className="coursesGrid">
                    {courseAssignments.length === 0 ? (
                        <div className="courseSquare">
                            <p>No assignments yet</p>
                        </div>
                    ) : (
                        courseAssignments.map((a) => (
                            <div key={a.id} className="courseSquare">
                                <Link href={`/courses/${params.id}/assignment-${a.id}`} className="assignmentLink">
                                    {a.assignmentTitle}
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
