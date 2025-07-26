import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HamburgerMenuIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { toggleThemeAction } from '../../store/slices/ThemeSlice.js';
import "./Header.css"

export default function Navbar() {
    const isUserLoggedIn = useSelector(state => state.userReducer.isUserLoggedIn);
    const theme = useSelector(state => state.themeReducer.theme);
    const pages = ["Home", `${isUserLoggedIn ? "Dashboard" : "Signup"}`];
    const routes = ["/", `${isUserLoggedIn ? "/users/dashboard" : "/users/signup"}`];
    const [mobileView, setMobileView] = useState(window.innerWidth <= 640);
    const [hamMenuOpen, setHamMenuOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, []);

    useEffect(() => {
        theme === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    }, [theme])

    function handleWindowResize() {
        setMobileView(window.innerWidth <= 640);
    }

    function handleThemeIconClick() {
        dispatch(toggleThemeAction());
    }

    function handleHamIconClick() {
        setHamMenuOpen(true);
    }

    function handleHamMenuClick() {
        setHamMenuOpen(false);
    }

    function checkIsActive(isActive) {
        if (isActive && theme === "light") {
            return "bg-[var(--water-500)] font-bold";
        }
        if (isActive && theme === "dark") {
            return "bg-[var(--ash-500)] font-bold";
        }
    }

    return (
        <header className={`sticky top-0 z-50 bg-[var(--water-100)] transition-all duration-300 ${theme}`} >
            <nav className={`grid grid-cols-[2fr_1fr] items-center h-14 w-full px-8 text-[var(--water-700)] ${theme} max-sm:px-4`}>
                <h1 className={`font-bold text-2xl ${theme}`}>The Blog Times</h1>
                <div className='flex justify-end gap-5 items-center'>
                    <ul
                        id="navbarOptions"
                        onClick={handleHamMenuClick}
                        className={`flex justify-end gap-6 transition-all duration-300 max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:gap-0 max-sm:overflow-y-auto max-sm:fixed max-sm:h-screen max-sm:w-screen max-sm:inset-0 max-sm:z-50 ${theme === "light" ? `max-sm:bg-[var(--water-100)]` : `max-sm:bg-[var(--ash-700)]`} ${hamMenuOpen ? "max-sm:opacity-100 max-sm:pointer-events-auto" : "max-sm:opacity-0 max-sm:pointer-events-none"}`}
                    >
                        {
                            routes.map((route, i) => {
                                if (route === "/users/dashboard" && !mobileView) {
                                    return null;
                                }
                                return (
                                    <li key={route} className="transition-all duration-200 max-sm:grid max-sm:text-center max-sm:w-full">
                                        <NavLink
                                            to={route}
                                            className={({ isActive }) =>
                                                `${checkIsActive(isActive)} px-5 py-2 rounded text-[var(--water-700)] transition-all duration-200 hover:bg-[var(--water-500)] ${theme} max-sm:p-4`
                                            }
                                        >
                                            {(pages[i])}
                                        </NavLink>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <div onClick={handleThemeIconClick} className={`cursor-pointer transition-all duration-200 hover:scale-[1.3] ${theme}`}>
                        {
                            theme === "light" ?
                                <MoonIcon className="h-full w-5" />
                                :
                                <SunIcon className="h-full w-5" />
                        }
                    </div>
                    {
                        isUserLoggedIn && !mobileView ?
                            (
                                <NavLink to="/users/dashboard" className='h-[30px] w-[30px] object-cover'>
                                    <img
                                        src="images/default-pfp.jpg"
                                        className='rounded-full cursor-pointer'
                                    />
                                </NavLink>
                            ) : null
                    }
                    {
                        mobileView ?
                            <HamburgerMenuIcon
                                id="hamIcon"
                                className="h-full w-6"
                                onClick={handleHamIconClick}
                            /> : null
                    }
                </div>
            </nav>
        </ header >
    );
}

