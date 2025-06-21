import {
  StrictMode,
  Suspense
} from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './routes';
import { store } from './store';
import "./index.css";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    < Suspense fallback={< div > Loading...</div >}>
      <RouterProvider router={router} />
    </Suspense >
  </Provider>
)
