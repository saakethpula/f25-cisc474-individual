import Image, { type ImageProps } from "next/image";
import "./dashboard.css";
import Link from "next/link";
import courses from "./courses.json";

type Props = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};

const ThemeImage = (props: Props) => {
    const { srcLight, srcDark, ...rest } = props;

    return (
        <>
            <Image {...rest} src={srcLight} className="imgLight" />
            <Image {...rest} src={srcDark} className="imgDark" />
        </>
    );
};

export default function Home() {
    return (
        <div className="dashboardContainer">
            {/* Left navigation */}
            <nav className="leftNav">
                <Link
                    href="/"
                    className="loginBtn"
                    aria-label="Login"
                >
                    :)
                </Link>
                <Link href="/dashboard">‎ Dashboard</Link>
                <Link href="/courses">‎ Courses</Link>
                <Link href="/messages">‎ Messages</Link>
                <Link href="/settings">‎ Settings</Link>
            </nav>
            {/* Main content */}
            <div className="mainContent">
                <h1 className="mainHeader">
                    Dashboard
                </h1>
                <p className="mainDescription">
                    Welcome to the dashboard! Here you'll find helpful information at a glance.
                </p>
                {/* Courses grid */}
                <div className="coursesGrid">
                    {courses.map((course: { name: string; grade: string }, idx: number) => (
                        <div
                            key={idx}
                            className="courseSquare"
                        >
                            <div className="courseName">
                                {course.name}
                            </div>
                            <div className="courseGrade">
                                Grade: <b>{course.grade}</b>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* To-Do List on the right */}
            <aside
                className="toDoList"
            >
                <h2 className="toDoHeader">To-Do List</h2>
                <ul className="toDoListItemsContainer">
                    {require("./todoList.json").map(
                        (todo: { id: string; task: string }, idx: number) => (
                            <li key={todo.id || idx}>
                                <input type="checkbox" id={`todo${idx}`} />
                                <label
                                    htmlFor={`todo${idx}`}
                                    className="toDoListItems"
                                >
                                    ‎ {todo.task}
                                </label>
                            </li>
                        )
                    )}
                </ul>
            </aside>
        </div>
    );
}