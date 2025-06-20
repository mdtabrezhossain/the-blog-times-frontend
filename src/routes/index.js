import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';


const App = lazy(() => import("../App.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Signup = lazy(() => import("../pages/Signup.jsx"));

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/signup",
                Component: Signup
            }
        ]
    }
]);

export default router;