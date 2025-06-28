import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';


const App = lazy(() => import("../App.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Signup = lazy(() => import("../pages/Signup.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const MyAccount = lazy(() => import("../pages/MyAccount.jsx"));

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
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/my-account",
                Component: MyAccount
            }
        ]
    }
]);

export default router;