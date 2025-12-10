import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BlogState from "./context/data/myState";

createRoot(document.getElementById('root')).render(
  <BlogState>
    <App />
  </BlogState>
);
