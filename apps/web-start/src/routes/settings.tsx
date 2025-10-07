import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({ component: RouteComponent });

function RouteComponent() {
  return (
    <main className="settingsContainer">
      <nav className="leftNav">
        <a href="/" className="loginBtn" aria-label="Login">:)</a>
        <a href="/dashboard"> Dashboard</a>
        <a href="/courses"> Courses</a>
        <a href="/messages"> Messages</a>
        <a href="/settings"> Settings</a>
      </nav>
      <div className="mainContent">
        <h1 className="mainHeader">Settings</h1>
        <p className="mainDescription">Manage your application settings here.</p>
        <div className="assignmentLinkText">
          Messages Page with Access to the Backend:
          <a className="assignmentLink" href="https://f25-cisc474-individual-web-chi.vercel.app/messages">
            https://f25-cisc474-individual-web-chi.vercel.app/messages
          </a>
        </div>
        <div className="assignmentLinkText">
          Courses Page with Access to the Backend:
          <a className="assignmentLink" href="https://f25-cisc474-individual-web-chi.vercel.app/courses">
            https://f25-cisc474-individual-web-chi.vercel.app/courses
          </a>
        </div>
        <div className="assignmentLinkText">Clicking on a course will show you the assignments for that class from the backend</div>
      </div>
    </main>
  );
}
