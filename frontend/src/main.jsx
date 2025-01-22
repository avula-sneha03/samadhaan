import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Now render the app after axios interceptors are set up
createRoot(document.getElementById('root')).render(
    <App/>
);
