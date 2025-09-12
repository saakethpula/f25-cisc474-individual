import React from "react";
import Link from "next/link";
import "../../class.css";

const Assignment1Q2 = () => {
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
                <h1 className="mainHeader">Assignment 1 - Question 2</h1>
                <div style={{ margin: '2rem' }}>
                    <div style={{ padding: '2rem', border: '1.5px solid #414141ff', background: '#fff', color: '#222' }}>
                        <h2 style={{ marginTop: 0 }}>File Upload</h2>
                        <p>What is 6^7? Upload your solution as a pdf for this problem:</p>
                    </div>
                    <div style={{ color: 'black', marginTop: '10rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                            <input type="file" disabled style={{ margin: '1rem 0' }} />
                            <div
                                style={{
                                    width: '100%',
                                    height: '50rem',
                                    border: '2px solid #000000ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#000000ff',
                                    fontSize: '1.2rem',
                                    marginLeft: '1rem'
                                }}
                            >
                                File preview will appear here
                            </div>
                        </div>
                        <div className="navButtons">
                            <Link href="/courses/example-class/assignment-1/q1">
                                <button style={{ padding: '0.5rem 1.5rem', borderRadius: 8, background: '#414141ff', color: '#fff', border: '1.5px solid #222', cursor: 'pointer' }}>
                                    Previous Question
                                </button>
                            </Link>
                            <Link href="/courses/example-class/assignment-1/q3">
                                <button style={{ padding: '0.5rem 1.5rem', borderRadius: 8, background: '#414141ff', color: '#fff', border: '1.5px solid #222', cursor: 'pointer' }}>
                                    Next Question
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>


        </main>
    );
};

export default Assignment1Q2;
