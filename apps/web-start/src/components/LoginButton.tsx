import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string;

  return (
    <button
      type="button"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            scope: 'read:courses',
            prompt: 'consent',
            audience: AUDIENCE,
          },
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;
