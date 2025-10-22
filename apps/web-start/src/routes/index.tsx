import { createFileRoute } from '@tanstack/react-router';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>

      <h1 className="loginHeader">Login</h1>
      <p className="loginSubtext">Please click the login button to access the LMS</p>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
              <LoginButton />
      </form>
    </main> 
  );
}
