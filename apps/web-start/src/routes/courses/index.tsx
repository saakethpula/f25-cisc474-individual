import { Link, createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiMutation, useApiQuery } from '../../integrations/api';

type Course = { id: number; courseName: string; syllabusContent?: string | null; instructorId?: number };

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [courses, setCourses] = useState<Array<Course> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'view' | 'update' | 'delete'>('view');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formSyllabus, setFormSyllabus] = useState('');
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { loginWithRedirect } = useAuth0();

  // Use auth-aware query to fetch courses. The backend path here is '/course'
  const coursesQuery = useApiQuery<Array<Course>>(['courses'], '/course');

  useEffect(() => {
    setError(coursesQuery.error ? String((coursesQuery.error as any)?.message ?? coursesQuery.error) : null);
    setCourses(coursesQuery.data ?? null);
  }, [coursesQuery.error, coursesQuery.data]);

  const createMutation = useApiMutation<{ courseName: string; syllabusContent?: string | null; instructorId: number }>(
    { path: '/course', method: 'POST', invalidateKeys: [['courses']] },
  );

  const updateMutation = useApiMutation<{ id: number; courseName?: string; syllabusContent?: string | null }, unknown>(
    { endpoint: (vars) => ({ path: `/course/${(vars as any).id}`, method: 'PATCH' }), invalidateKeys: [['courses']] },
  );

  const deleteMutation = useApiMutation<{ id: number }, unknown>(
    { endpoint: (vars) => ({ path: `/course/${(vars as any).id}`, method: 'DELETE' }), invalidateKeys: [['courses']] },
  );

  async function handleCreateCourse(payload: { courseName: string; syllabusContent?: string | null; instructorId: number }) {
    await createMutation.mutateAsync(payload);
  }

  async function handleUpdateCourse(id: number, payload: { courseName?: string; syllabusContent?: string | null }) {
    await updateMutation.mutateAsync({ ...payload, id });
  }

  async function handleDeleteCourse(id: number) {
    await deleteMutation.mutateAsync({ id });
  }

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
        <h1 className="mainHeader">Courses</h1>
        <p className="mainDescription">Welcome to the Courses page.</p>

        {!coursesQuery.isAuthPending && !coursesQuery.isEnabled && (
          <div className="coursesGrid"><p className="error">You must be logged in to view courses. <button onClick={() => loginWithRedirect()} style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 6, border: 'none', background: '#0b74de', color: 'white' }}>Login</button></p></div>
        )}

        {coursesQuery.showLoading && <div className="fallback">Loading courses...</div>}

        {error && <div className="coursesGrid"><p className="error">Error loading courses: {error}</p></div>}

        {courses && (
          <div className="coursesGrid">
            {courses.map((c) => {
              if (mode === 'delete') {
                return (
                  <div key={c.id} className="courseSquare" style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedCourse(c);
                    if (confirm(`Delete course "${c.courseName}"? This cannot be undone.`)) {
                      handleDeleteCourse(c.id);
                    }
                  }}>
                    {c.courseName}
                  </div>
                );
              }

              if (mode === 'update') {
                return (
                  <div key={c.id} className="courseSquare" style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedCourse(c);
                    setFormName(c.courseName);
                    setFormSyllabus(c.syllabusContent ?? '');
                    setShowForm(true);
                  }}>
                    {c.courseName}
                  </div>
                );
              }

              // view mode - client-side Link navigation
              return (
                <Link key={c.id} to={("/courses/" + String(c.id)) as any}>
                  <div className="courseSquare" style={{ cursor: 'pointer' }}>{c.courseName}</div>
                </Link>
              );
            })}
          </div>
        )}

        {/* The create/update form and action buttons */}
        {showForm && (
          <div>
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100 }} onClick={() => { if (!saving) { setShowForm(false); setSelectedCourse(null); } }} />
            <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 'min(720px, 92%)', background: 'white', borderRadius: 8, padding: 20, zIndex: 1200, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} role="dialog" aria-modal="true">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ margin: 0 }}>{selectedCourse ? 'Update Course' : 'Create Course'}</h2>
                <button aria-label="Close" onClick={() => { if (!saving) { setShowForm(false); setSelectedCourse(null); } }} style={{ border: 'none', background: 'transparent', fontSize: 20 }}>✕</button>
              </div>

              {formErrors && <div style={{ marginBottom: 12, color: 'crimson' }}>{formErrors}</div>}

              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontWeight: 600 }}>Course Name</label>
                  <input value={formName} onChange={(e) => setFormName(e.target.value)} style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontWeight: 600 }}>Syllabus (optional)</label>
                  <textarea value={formSyllabus} onChange={(e) => setFormSyllabus(e.target.value)} style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd', minHeight: 120 }} />
                </div>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
                  <button onClick={() => { setShowForm(false); setSelectedCourse(null); }} disabled={saving} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: '#fff' }}>Cancel</button>
                  <button onClick={async () => {
                    setFormErrors(null);
                    if (!formName.trim()) { setFormErrors('Course name is required'); return; }
                    setSaving(true);
                    try {
                      if (selectedCourse) {
                        await handleUpdateCourse(selectedCourse.id, { courseName: formName.trim(), syllabusContent: formSyllabus.trim() || null });
                      } else {
                        await handleCreateCourse({ courseName: formName.trim(), syllabusContent: formSyllabus.trim() || null, instructorId: 1 });
                      }
                      setShowForm(false);
                      setSelectedCourse(null);
                    } catch (err: unknown) {
                      const e = err as { message?: string };
                      setFormErrors(e.message ?? 'Failed to save course');
                    } finally {
                      setSaving(false);
                    }
                  }} disabled={saving} style={{ padding: '8px 14px', borderRadius: 6, border: 'none', background: '#0b74de', color: 'white' }}>{saving ? (selectedCourse ? 'Saving...' : 'Creating...') : 'Save'}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ position: 'fixed', right: 20, bottom: 20, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1000 }}>
          <button aria-label="Create course" title="Create" onClick={() => { setSelectedCourse(null); setFormName(''); setFormSyllabus(''); setShowForm(true); setMode('view'); }} style={{ padding: '10px 14px', borderRadius: 8, background: '#0b74de', color: 'white', border: 'none' }}>Create</button>
          <button aria-label="Update course" title="Update" onClick={() => { setMode((m) => m === 'update' ? 'view' : 'update'); }} style={{ padding: '10px 14px', borderRadius: 8, background: mode === 'update' ? '#c97d2c' : '#f0ad4e', color: 'white', border: 'none' }}>{mode === 'update' ? 'Updating...' : 'Update'}</button>
          <button aria-label="Delete course" title="Delete" onClick={() => { setMode((m) => m === 'delete' ? 'view' : 'delete'); }} style={{ padding: '10px 14px', borderRadius: 8, background: mode === 'delete' ? '#a94442' : '#d9534f', color: 'white', border: 'none' }}>{mode === 'delete' ? 'Deleting...' : 'Delete'}</button>
        </div>

        {mode !== 'view' && (
          <div style={{ position: 'fixed', right: 20, bottom: 180, background: 'rgba(0,0,0,0.7)', color: 'white', padding: '8px 12px', borderRadius: 8, zIndex: 1000 }}>
            <span style={{ marginRight: 12 }}>{mode === 'update' ? 'Update mode: click a course to edit' : 'Delete mode: click a course to delete'}</span>
            <button onClick={() => setMode('view')} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>✕</button>
          </div>
        )}
      </div>
    </main>
  );
}
