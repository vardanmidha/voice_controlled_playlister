import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

/// Disable react dev tools when in production 
if(process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>  
      <App />
  </React.StrictMode>
);


reportWebVitals();