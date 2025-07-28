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
import PageLoader from './components/page-loader.jsx';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense >
  </Provider>
)
