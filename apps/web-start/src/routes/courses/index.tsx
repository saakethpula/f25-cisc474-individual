import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

type Course = { id: number; courseName: string };

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [courses, setCourses] = useState<Array<Course> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch('https://f25-cisc474-individual-234i.onrender.com/course', { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);
        const data: Array<Course> = await res.json();
        setCourses(data);
      } catch (err: unknown) {
        const e = err as { name?: string; message?: string };
        if (e.name === 'AbortError') return;
        setError(e.message ?? String(err));
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main className="coursesContainer">
      <nav className="leftNav">
        <a href="/" className="loginBtn" aria-label="Login">:)</a>
        <a href="/dashboard"> Dashboard</a>
        <a href="/courses"> Courses</a>
        <a href="/messages"> Messages</a>
        <a href="/settings"> Settings</a>
      </nav>

      <div className="mainContent">
        <h1 className="mainHeader">Courses</h1>
        <p className="mainDescription">Welcome to the Courses page.</p>

        {loading && <div className="fallback">Loading courses...</div>}
        {error && <div className="coursesGrid"><p className="error">Error loading courses: {error}</p></div>}
        {courses && (
          <div className="coursesGrid">
            {courses.map((c) => (
              <a key={c.id} className="courseSquare" href={`/courses/${c.id}`}>
                {c.courseName}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
