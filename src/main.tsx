// sort-imports-ignore

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app.tsx';

// ! Remember that StrictMode is a tool for highlighting potential problems in an application.
// ! It doesn’t render any visible UI. It activates additional checks and warnings for its descendants.
// ! In dev mode it will cause 2 renders which is confusing when debugging if you do not keep this in mind.

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);

  const Initialized: React.FC = () => {
    return (
      // <React.StrictMode>
      <App />
      // </React.StrictMode>
    );
  };

  try {
    root.render(<Initialized />);
  } catch (e) {
    console.log('Whoa....major problem');
  }
}
