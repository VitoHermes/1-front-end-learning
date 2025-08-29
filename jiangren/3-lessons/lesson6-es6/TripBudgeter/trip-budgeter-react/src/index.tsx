import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing');
const root = ReactDOM.createRoot(container);
root.render(<App />);
