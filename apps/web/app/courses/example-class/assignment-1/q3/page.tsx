import React from "react";
import "../../class.css";
import Link from "next/link";
const Assignment1Q3 = () => {
    return (
        <main className="coursesContainer">
            <nav className="leftNav">
                <a href="/" className="loginBtn" aria-label="Login">:)</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/courses">Courses</a>
                <a href="/messages">Messages</a>
                <a href="/settings">Settings</a>
            </nav>
            <div className="mainContent">
                <h1 className="mainHeader">Assignment 1 - Question 3</h1>
                <div style={{ padding: '2rem', border: '1.5px solid #414141ff', background: '#fff', color: '#222' }}>
                    <h2 style={{ marginTop: 0 }}>Click The Error</h2>
                    <p>Click the part of the code that is incorrect:</p>
                </div>
                <div className="codeContainer" style={{ color: 'black', marginTop: '2rem', marginBottom: '2rem' }}>
                    <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: 8, fontSize: '1.1rem', overflowX: 'auto' }}>
                        {`def greet(name)
                        print("Hello, " + name)
                        greet("World"
`}
                    </pre>
                </div>
                <div className="codeContainer" style={{ color: 'black', marginTop: '10rem' }}>
                </div>
                <div className="navButtons">
                    <Link href="/courses/example-class/assignment-1/q1">
                        <button style={{ padding: '0.5rem 1.5rem', borderRadius: 8, background: '#414141ff', color: '#fff', border: '1.5px solid #222', cursor: 'pointer' }}>
                            Previous Question
                        </button>
                    </Link>
                    <Link href="/courses/example-class">
                        <button style={{ padding: '0.5rem 1.5rem', borderRadius: 8, background: '#414141ff', color: '#fff', border: '1.5px solid #222', cursor: 'pointer' }}>
                            Submit Assignment
                        </button>
                    </Link>
                </div>
            </div>

        </main>
    );
};

export default Assignment1Q3;
