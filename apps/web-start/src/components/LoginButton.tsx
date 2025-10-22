import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      type="button"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            scope: 'read:courses',
            prompt: 'consent',
            redirect_uri: window.location.origin + '/dashboard',
          },
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;
