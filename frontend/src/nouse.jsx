// src/App.jsx

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ScoreForm from './components/ScoreForm';

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <div>
      {!userAuthenticated ? (
        <LoginForm setUserAuthenticated={setUserAuthenticated} />
      ) : (
        <ScoreForm />
      )}
    </div>
  );
};

export default App;
