import Image, { type ImageProps } from "next/image";
import "./grades.css";
import Link from "next/link";
import React from "react";
import "../class.css";
import grades from "./grades.json";

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

const ExampleGrades = () => {
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
                <h1 className="mainHeader">
                    Grades
                </h1>
                <div className="gradesTable">
                    <div className="gradesRow gradesHeader">
                        <div className="gradesCell">Assignment</div>
                        <div className="gradesCell">Due Date</div>
                        <div className="gradesCell">Submitted</div>
                        <div className="gradesCell">Grade</div>
                    </div>
                    {grades.map((g, i) => (
                        <div className="gradesRow" key={i}>
                            <div className="gradesCell">{g.assignment}</div>
                            <div className="gradesCell">{g.due}</div>
                            <div className="gradesCell">{g.submitted}</div>
                            <div className="gradesCell">{g.grade}</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ExampleGrades;