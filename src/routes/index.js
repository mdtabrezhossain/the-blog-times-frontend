import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App = lazy(() => import("../App.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Signup = lazy(() => import("../pages/Signup.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const BigCard = lazy(() => import("../components/blog-cards/BigCard.jsx"));

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
                path: "/users/signup",
                Component: Signup
            },
            {
                path: "/users/login",
                Component: Login
            },
            {
                path: "/users/:username/dashboard",
                Component: Dashboard
            },
            {
                path: "/blogs/:blogid",
                Component: BigCard
            }
        ]
    }
]);

export default router;