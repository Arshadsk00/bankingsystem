import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDom from "react-dom/client";
import App from './App.jsx';
import './i18n.js';
import "./css/theme.css";

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
