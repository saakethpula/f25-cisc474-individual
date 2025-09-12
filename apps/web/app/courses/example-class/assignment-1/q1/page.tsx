import React from "react";
import Link from "next/link";
import "../../class.css";

const Assignment1Q1 = () => {
    return (
        <main className="coursesContainer">
            <nav className="leftNav">
                <Link href="/" className="loginBtn" aria-label="Login">:)</Link>
                <Link href="/dashboard"> Dashboard</Link>
                <Link href="/courses"> Courses</Link>
                <Link href="/messages"> Messages</Link>
                <Link href="/settings"> Settings</Link>
            </nav>
            <div className="mainContent">
                <h1 className="mainHeader">Assignment 1 - Question 1</h1>
                <div style={{ margin: '2rem' }}>
                    <div style={{ padding: '2rem', border: '1.5px solid #414141ff', background: '#fff', color: '#222' }}>
                        <h2 style={{ marginTop: 0 }}>Multiple Choice</h2>
                        <p>What is 6 + 7?</p>
                    </div>
                    <form style={{ color: "black" }}>
                        <div><input type="radio" name="q1" id="a1" /> <label htmlFor="a1">12</label></div>
                        <div><input type="radio" name="q1" id="a2" /> <label htmlFor="a2">13</label></div>
                        <div><input type="radio" name="q1" id="a3" /> <label htmlFor="a3">14</label></div>
                        <div><input type="radio" name="q1" id="a4" /> <label htmlFor="a4">67</label></div>
                    </form>
                    <Link className="navButtons" href="/courses/example-class/assignment-1/q2">
                        <button style={{ marginTop: '2rem', padding: '0.5rem 1.5rem', borderRadius: 8, background: '#414141ff', color: '#fff', border: '1.5px solid #222', cursor: 'pointer' }}>
                            Next Question
                        </button>
                    </Link>
                </div>
            </div>
        </main >
    );
};

export default Assignment1Q1;
