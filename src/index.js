import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { store } from "../src/store";

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </Provider>,
  document.getElementById('root')
);

