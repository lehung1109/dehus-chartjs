import { createRoot } from 'react-dom/client';
import App from './App';

const dom = document.getElementById('app');
const root = dom && createRoot(dom);
root && root.render(<App />);