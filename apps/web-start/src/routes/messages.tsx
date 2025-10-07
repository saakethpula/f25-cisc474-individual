import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

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

export const Route = createFileRoute('/messages')({ component: RouteComponent });

function RouteComponent() {
  const [messages, setMessages] = useState<Array<Message> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('https://f25-cisc474-individual-234i.onrender.com/message', { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
        const data: Array<Message> = await res.json();
        setMessages(data);
      } catch (err: unknown) {
        const e = err as { name?: string; message?: string };
        if (e.name === 'AbortError') return;
        setError(e.message ?? String(err));
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <main className="messagesContainer">
      <nav className="leftNav">
        <a href="/" className="loginBtn" aria-label="Login">:)</a>
        <a href="/dashboard"> Dashboard</a>
        <a href="/courses"> Courses</a>
        <a href="/messages"> Messages</a>
        <a href="/settings"> Settings</a>
      </nav>

      <div className="mainContent">
        <h1 className="mainHeader">Messages</h1>
        <p className="mainDescription">This is the messages page.</p>

        <section>
          <h2>Inbox</h2>
          {loading && <div>Loading messages...</div>}
          {error && <p className="error">Error loading messages: {error}</p>}
          {messages && (
            <ul className="messagesList">
              {messages.map((m) => (
                <li key={m.id} className="messageItem">
                  <div className="messageSubject">{m.subject}</div>
                  <div className="messageBody">{m.body}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
