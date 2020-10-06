import React, { useState } from 'react';

import WelcomeScreen from './WelcomeScreen';
import LoginForm from './LoginForm';

const LoginScreen = () => {
  const [viewLogin, toggleLogin] = useState(false);
  return (
    <>
      {viewLogin ? (
        <LoginForm toggleLogin={toggleLogin} />
      ) : (
        <WelcomeScreen toggleLogin={toggleLogin} />
      )}
    </>
  );
};
export default LoginScreen;
