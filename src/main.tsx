import App from '@root/App';
import { createRoot } from 'react-dom/client';

// Clean standalone entry point — renders the app immediately.
createRoot(document.querySelector('#root')!).render(<App />);
