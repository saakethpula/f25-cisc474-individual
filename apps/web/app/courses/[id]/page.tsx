import React, { Suspense } from "react";
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

// Async server component that fetches and renders assignments for a course
async function CourseAssignments({ courseId }: { courseId: string }) {
    try {
        const assignments = await getAssignments();
        const courseAssignments = assignments.filter((a) => String(a.courseId) === courseId);

        if (courseAssignments.length === 0) {
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
                {courseAssignments.map((a) => (
                    <div key={a.id} className="courseSquare">
                        <Link href={`/courses/${courseId}/assignment-${a.id}`} className="assignmentLink">
                            {a.assignmentTitle}
                        </Link>
                    </div>
                ))}
            </div>
        );
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return <div className="coursesGrid"><p className="error">Error loading assignments: {message}</p></div>;
    }
}

export default async function CoursePage(props: any) {
    const { params } = props;
    const course = await getCourse(params.id);

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

                <Suspense fallback={<div>Loading assignments...</div>}>
                    {/* CourseAssignments is an async server component; Suspense will show the fallback during client navigation */}
                    <CourseAssignments courseId={params.id} />
                </Suspense>
            </div>
        </main>
    );
}
