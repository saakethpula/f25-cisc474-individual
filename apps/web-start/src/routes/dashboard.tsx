import { createFileRoute } from '@tanstack/react-router';
import courses from '../data/courses.json';
import todoList from '../data/todoList.json';
import '../styles.css';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="dashboardContainer">
      <nav className="leftNav">
        <a href="/" className="loginBtn" aria-label="Login">:)</a>
        <a href="/dashboard"> Dashboard</a>
        <a href="/courses"> Courses</a>
        <a href="/messages"> Messages</a>
        <a href="/settings"> Settings</a>
      </nav>

      <div className="mainContent">
        <h1 className="mainHeader">Dashboard</h1>
        <p className="mainDescription">Welcome to the dashboard! Here you'll find helpful information at a glance.</p>

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
    </main>
  );
}
