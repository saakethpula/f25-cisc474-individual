import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function AuthDebug() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
  const [tokenOk, setTokenOk] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function checkToken() {
    setChecking(true);
    try {
      // Attempt to get a token silently (no prompt)
      const t = await getAccessTokenSilently({ authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE } as any });
      setTokenOk(Boolean(t) ? 'yes' : 'no');
    } catch (e: any) {
      setTokenOk(`error: ${e?.error ?? e?.message ?? String(e)}`);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 2000, background: 'rgba(0,0,0,0.8)', color: 'white', padding: 12, borderRadius: 8, fontSize: 12, width: 320 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Auth Debug</div>
      <div>isLoading: {String(isLoading)}</div>
      <div>isAuthenticated: {String(isAuthenticated)}</div>
      <div>user: {user ? JSON.stringify({ name: user.name, email: user.email }, null, 0) : 'null'}</div>
      <div style={{ marginTop: 8 }}>token present: {tokenOk ?? 'unknown'}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={checkToken} disabled={checking} style={{ padding: '6px 8px', borderRadius: 6, border: 'none' }}>{checking ? 'Checking...' : 'Check token'}</button>
        <button onClick={() => { setTokenOk(null); }} style={{ padding: '6px 8px', borderRadius: 6, border: 'none' }}>Clear</button>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, opacity: 0.9 }}>Show this panel by adding ?authdebug to the dashboard URL.</div>
    </div>
  );
}
