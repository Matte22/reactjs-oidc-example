import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // with the React.StictMode component this is something that is used in dev mode to help catch potential problems
  // it is what can cause something to render twice or be called twice. 
  // additonal info: https://legacy.reactjs.org/docs/strict-mode.html
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

