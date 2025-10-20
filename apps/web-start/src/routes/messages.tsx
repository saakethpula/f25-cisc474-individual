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
  const [activeTab, setActiveTab] = useState<'UNREAD' | 'READ'>('UNREAD');

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
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button
              onClick={() => setActiveTab('UNREAD')}
              aria-pressed={activeTab === 'UNREAD'}
              style={{ padding: '6px 12px', borderRadius: 8, background: activeTab === 'UNREAD' ? '#383838' : '#efefef', color: activeTab === 'UNREAD' ? '#fff' : '#000' }}
            >
              Unread {messages ? `(${messages.filter((m) => m.status === 'UNREAD').length})` : ''}
            </button>
            <button
              onClick={() => setActiveTab('READ')}
              aria-pressed={activeTab === 'READ'}
              style={{ padding: '6px 12px', borderRadius: 8, background: activeTab === 'READ' ? '#383838' : '#efefef', color: activeTab === 'READ' ? '#fff' : '#000' }}
            >
              Read {messages ? `(${messages.filter((m) => m.status === 'READ').length})` : ''}
            </button>
          </div>
          {loading && <div>Loading messages...</div>}
          {error && <p className="error">Error loading messages: {error}</p>}
          {messages && (
            <ul className="messagesList">
              {messages
                .filter((m) => (activeTab === 'UNREAD' ? m.status === 'UNREAD' : m.status === 'READ'))
                .map((m) => (
                  <li key={m.id} className="messageItem" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div className="messageSubject">{m.subject}</div>
                    <div className="messageBody">{m.body}</div>
                    {activeTab === 'UNREAD' && (
                      <div>
                        <button
                          onClick={async () => {
                            try {
                              // Optimistic UI update
                              setMessages((prev) => prev?.map((msg) => (msg.id === m.id ? { ...msg, status: 'READ' } : msg)) ?? null);
                              const res = await fetch(`https://f25-cisc474-individual-234i.onrender.com/message/${m.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: 'READ' }),
                              });
                              if (!res.ok) {
                                throw new Error(`Failed to update message: ${res.status}`);
                              }
                            } catch (err) {
                              // Revert optimistic update on error
                              setMessages((prev) => prev?.map((msg) => (msg.id === m.id ? { ...msg, status: 'UNREAD' } : msg)) ?? null);
                              console.error(err);
                              alert('Failed to mark message as read');
                            }
                          }}
                          style={{ padding: '6px 12px', borderRadius: 6 }}
                        >
                          Mark as read
                        </button>
                      </div>
                    )}

                    {activeTab === 'READ' && (
                      <div>
                        <button
                          onClick={async () => {
                            try {
                              // Optimistic UI update
                              setMessages((prev) => prev?.map((msg) => (msg.id === m.id ? { ...msg, status: 'UNREAD' } : msg)) ?? null);
                              const res = await fetch(`https://f25-cisc474-individual-234i.onrender.com/message/${m.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: 'UNREAD' }),
                              });
                              if (!res.ok) {
                                throw new Error(`Failed to update message: ${res.status}`);
                              }
                            } catch (err) {
                              // Revert optimistic update on error
                              setMessages((prev) => prev?.map((msg) => (msg.id === m.id ? { ...msg, status: 'READ' } : msg)) ?? null);
                              console.error(err);
                              alert('Failed to mark message as unread');
                            }
                          }}
                          style={{ padding: '6px 12px', borderRadius: 6 }}
                        >
                          Mark as unread
                        </button>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
