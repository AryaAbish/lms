import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ContextShare, { cartcontext } from './components/ContextShare';
import { Provider } from 'react-redux';
import store from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextShare>
      <BrowserRouter>
      <Provider store={store}><App /></Provider>
    </BrowserRouter>
  </ContextShare>
  </React.StrictMode>
);


