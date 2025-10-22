import { Link, createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import '../../styles.css';
import { useApiQuery } from '../../integrations/api';

type Assignment = { id: number; assignmentTitle: string; courseId: number };
type Course = { id: number; courseName: string, syllabusContent: string | null };

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
  const { loginWithRedirect } = useAuth0();

  const courseQuery = useApiQuery<Course>(['course', id], `/course/${encodeURIComponent(id)}`);
  const assignmentsQuery = useApiQuery<Array<Assignment>>(['assignments'], '/assignment');

  const loading = courseQuery.showLoading || assignmentsQuery.showLoading;
  const error = courseQuery.error ? String((courseQuery.error as any)?.message ?? courseQuery.error) : assignmentsQuery.error ? String((assignmentsQuery.error as any)?.message ?? assignmentsQuery.error) : null;

  const course = courseQuery.data ?? null;
  const assignments = (assignmentsQuery.data ?? null)?.filter((a) => String(a.courseId) === id) ?? null;

  return (
    <main className="coursesContainer">
      <nav className="leftNav">
        <Link to="/" className="loginBtn" aria-label="Login">:)</Link>
        <Link to="/dashboard"> Dashboard</Link>
        <Link to="/courses"> Courses</Link>
        <Link to="/messages"> Messages</Link>
        <Link to="/settings"> Settings</Link>
      </nav>

      <div className="mainContent">
        <h1 className="mainHeader">{loading ? 'Loading...' : course?.courseName ?? 'Course'}</h1>
        <p className="mainDescription">{loading ? 'Loading course...' : `Syllabus: ${course?.syllabusContent ?? ''}`}</p>

        {(!courseQuery.isEnabled || !assignmentsQuery.isEnabled) && (
          <div className="coursesGrid"><p className="error">You must be logged in to view this course. <button onClick={() => loginWithRedirect()} style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 6, border: 'none', background: '#0b74de', color: 'white' }}>Login</button></p></div>
        )}

        {loading && <div className="fallback">Loading assignments...</div>}
        {error && <p className="error">Error loading: {error}</p>}

        {assignments && assignments.length === 0 && (
          <div className="coursesGrid"><div className="courseSquare"><p>No assignments yet</p></div></div>
        )}

        {assignments && assignments.length > 0 && (
          <div className="coursesGrid">
            {assignments.map((a) => (
              <div key={a.id} className="courseSquare">
                <Link to={(`/courses/${id}/assignment-${a.id}`) as any} className="assignmentLink">{a.assignmentTitle}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
