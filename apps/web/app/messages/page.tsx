"use client";

import React, { useEffect, useState } from "react";
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


function MessagesList() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch("https://f25-cisc474-individual-234i.onrender.com/message", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
        const data: Message[] = await res.json();
        if (mounted) setMessages(data);
      } catch (err: unknown) {
        const e = err as { name?: string; message?: string };
        if (e.name === "AbortError") return;
        if (mounted) setError(e.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <p className="error">Error loading messages: {error}</p>;
  if (!messages || messages.length === 0) return <p>No messages</p>;

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
            <MessagesList />
        </section>
      </div>
    </main>
  );
}