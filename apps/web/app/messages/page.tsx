import React, { Suspense } from "react";
import Link from "next/link";
import "./messages.css";

type Message = {
  id: string;
  senderId: string;
  body: string;
  subject: string;
  timestamp: string;
  status: string;
  recipientId: string;
  parentMessageId?: string;
};

async function getMessages(): Promise<Message[]> {
  const res = await fetch("https://f25-cisc474-individual-234i.onrender.com/message", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Async server component that fetches and renders the messages list.
async function MessagesList() {
  try {
    const messages = await getMessages();

    if (!messages || messages.length === 0) {
      return <p>No messages</p>;
    }

    return (
      <ul className="messagesList">
        {messages.map((m) => (
          <li key={m.id} className="messageItem">
            <div className="messageSubject">{m.subject}</div>
            <div className="messageBody">{m.body}</div>
          </li>
        ))}
      </ul>
    );
  } catch (err: any) {
    return <p className="error">Error loading messages: {err?.message ?? String(err)}</p>;
  }
}

export default function MessagesPage() {
  return (
    <main className="messagesContainer">
      <nav className="leftNav">
        <Link href="/" className="loginBtn" aria-label="Login">:)</Link>
        <Link href="/dashboard"> Dashboard</Link>
        <Link href="/courses"> Courses</Link>
        <Link href="/messages"> Messages</Link>
        <Link href="/settings"> Settings</Link>
      </nav>

      <div className="mainContent">
        <h1 className="mainHeader">Messages</h1>
        <p className="mainDescription">This is the messages page.</p>

        <section>
          <h2>Inbox</h2>
          <Suspense fallback={<div>Loading messages...</div>}>
            <MessagesList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}