import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import '../../styles.css';

type Assignment = { id: number; assignmentTitle: string; courseId: number };
type Course = { id: number; courseName: string };

export const Route = createFileRoute('/courses/$id')({
  component: RouteComponent,
});

function RouteComponent(props: any) {
  const rawId = String(props?.params?.id ?? '');
  // Try to normalize id from router params first.
  const firstSeg = rawId.split('/')[0] ?? rawId;
  const idMatch = firstSeg.match(/\d+/);
  let id = idMatch ? idMatch[0] : firstSeg;

  // Fallback: if params are empty (some route-tree mismatches), try to derive id from the URL path.
  if (!id) {
    try {
      const href = typeof window !== 'undefined' ? window.location.pathname : '';
      const segments = href.split('/').filter(Boolean);
      const coursesIndex = segments.indexOf('courses');
      if (coursesIndex !== -1 && segments.length > coursesIndex + 1) {
        const seg = segments[coursesIndex + 1];
  const segMatch = String(seg).match(/\d+/);
  id = segMatch ? segMatch[0] : String(seg || '');
        console.warn('Derived id from URL path fallback', { href, id });
      }
    } catch (e) {
      // ignore
    }
  }
  const [course, setCourse] = useState<Course | null>(null);
  const [assignments, setAssignments] = useState<Array<Assignment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        console.log('CourseRoute mounted with props', props);
        if (!id) {
          console.error('Missing course id in route params', props?.params);
          setError('Missing course id');
          setLoading(false);
          return;
        }
        const [courseRes, assignmentsRes] = await Promise.all([
          fetch(`https://f25-cisc474-individual-234i.onrender.com/course/${id}`, { signal: controller.signal }),
          fetch(`https://f25-cisc474-individual-234i.onrender.com/assignment`, { signal: controller.signal }),
        ]);

        const courseUrl = `https://f25-cisc474-individual-234i.onrender.com/course/${encodeURIComponent(id)}`;
        const assignmentsUrl = `https://f25-cisc474-individual-234i.onrender.com/assignment`;

        console.log('Fetched urls', { courseUrl, assignmentsUrl, courseStatus: courseRes.status, assignmentsStatus: assignmentsRes.status });

        if (!courseRes.ok) {
          const text = await courseRes.text().catch(() => 'unable to read body');
          console.error('Course fetch failed', { url: courseUrl, status: courseRes.status, body: text });
          throw new Error(`Failed to fetch course: ${courseRes.status} - ${text} (url: ${courseUrl})`);
        }

        if (!assignmentsRes.ok) {
          const text = await assignmentsRes.text().catch(() => 'unable to read body');
          console.error('Assignments fetch failed', { url: assignmentsUrl, status: assignmentsRes.status, body: text });
          throw new Error(`Failed to fetch assignments: ${assignmentsRes.status} - ${text} (url: ${assignmentsUrl})`);
        }

        const courseData: Course = await courseRes.json();
        const assignmentsData: Array<Assignment> = await assignmentsRes.json();
        setCourse(courseData);
        setAssignments(assignmentsData.filter((a) => String(a.courseId) === id));
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
  }, [id]);

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
        <h1 className="mainHeader">{loading ? 'Loading...' : course?.courseName ?? 'Course'}</h1>
        <p className="mainDescription">{loading ? 'Loading course...' : `Welcome to the ${course?.courseName ?? 'course'} page.`}</p>

        {loading && <div className="fallback">Loading assignments...</div>}
        {error && <p className="error">Error loading: {error}</p>}

        {assignments && assignments.length === 0 && (
          <div className="coursesGrid"><div className="courseSquare"><p>No assignments yet</p></div></div>
        )}

        {assignments && assignments.length > 0 && (
          <div className="coursesGrid">
            {assignments.map((a) => (
              <div key={a.id} className="courseSquare">
                <a href={`/courses/${id}/assignment-${a.id}`} className="assignmentLink">{a.assignmentTitle}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
