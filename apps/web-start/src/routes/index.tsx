import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <h1 className="loginHeader">Login</h1>
      <p className="loginSubtext">Please enter your credentials to log in.</p>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
        <input className="textInput" type="text" placeholder="Username" />
        <input className="textInput" type="password" placeholder="Password" />
        <a href="/dashboard" className="button" aria-label="Login">Login</a>
      </form>
    </main>
  );
}
