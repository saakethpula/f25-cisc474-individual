import { Link, createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import courses from '../data/courses.json';
import todoList from '../data/todoList.json';
import '../styles.css';
import AuthDebug from '../components/AuthDebug';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});


function RouteComponent() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  // Show a loading state while the Auth0 SDK initializes
  if (isLoading) {
    return (
      <main className="dashboardContainer">
        <div className="mainContent">
          <h1 className="mainHeader">Dashboard</h1>
          <p className="mainDescription">Loading authentication status...</p>
        </div>
      </main>
    );
  }

  // If the user is not authenticated, show a friendly prompt instead of rendering nothing
  if (!isAuthenticated) {
    return (
      <main className="dashboardContainer">
        <div className="mainContent">
          <h1 className="mainHeader">Dashboard</h1>
          <p className="mainDescription">You must be logged in to view the dashboard. Please log in first.</p>
        </div>
      </main>
    );
  }

  // Authenticated: render the dashboard
  return (
    <main className="dashboardContainer">
      <nav className="leftNav">
        <Link to="/" className="loginBtn" aria-label="Login">:)</Link>
        <Link to="/dashboard"> Dashboard</Link>
        <Link to="/courses"> Courses</Link>
        <Link to="/messages"> Messages</Link>
        <Link to="/settings"> Settings</Link>
      </nav>

      <div className="mainContent">
        <h1 className="mainHeader">Dashboard</h1>
        <p className="mainDescription">Welcome to the dashboard {JSON.stringify(user, null, 2)}! Here you'll find helpful information at a glance.</p>

        <div className="coursesGrid">
          {courses.map((course: { name: string; grade: string }, idx: number) => (
            <div key={idx} className="courseSquare">
              <div className="courseName">{course.name}</div>
              <div className="courseGrade">Grade: <b>{course.grade}</b></div>
            </div>
          ))}
        </div>
      </div>

      <aside className="toDoList">
        <h2 className="toDoHeader">To-Do List</h2>
        <ul className="toDoListItemsContainer">
          {todoList.map((todo: { id: string; task: string }, idx: number) => (
            <li key={todo.id || idx}>
              <input type="checkbox" id={`todo${idx}`} />
              <label htmlFor={`todo${idx}`} className="toDoListItems">{todo.task}</label>
            </li>
          ))}
        </ul>
      </aside>
      {/* Dev-only auth debug panel (show with ?authdebug) */}
      {typeof window !== 'undefined' && window.location.search.includes('authdebug') && <AuthDebug />}
    </main>
  );
}
