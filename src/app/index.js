
import React from 'react';
import {render} from 'react-dom';

import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './app';
import Login from './components/login'
 
//render(<App/>,document.getElementById('app'))

const root = ReactDOM.createRoot(
    document.getElementById("app")
  );
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);