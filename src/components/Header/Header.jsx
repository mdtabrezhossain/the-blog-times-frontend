import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HamburgerMenuIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { toggleThemeAction } from '../../store/slices/ThemeSlice';
import "./Header.css"

export default function Navbar() {
    const routes = ["/", "/signup"];
    const pages = ["Home", "Signup"];
    const theme = useSelector(state => state.themeReducer.theme);
    const dispatch = useDispatch();
    const [mobileView, setMobileView] = useState(window.innerWidth <= 640);
    const [hamMenuOpen, setHamMenuOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, []);

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
        <header className={`bg-[var(--water-100)] shadow-md transiton-all duration-300 ${theme}`} >
            <nav className={`grid grid-cols-[1fr_1fr] items-center h-14 px-8 text-[var(--water-700)] ${theme} max-sm:px-3`}>
                <h1 className={`font-bold text-2xl ${theme}`}>The Blog Times</h1>
                <div className='flex justify-end gap-5'>
                    <ul
                        id="navbarOptions"
                        onClick={handleHamMenuClick}
                        className={`flex justify-end gap-6 max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:gap-0 max-sm:overflow-y-auto max-sm:fixed max-sm:h-screen max-sm:w-screen max-sm:inset-0 max-sm:z-50 max-sm:bg-black/50 max-sm:backdrop-blur-md transition-all duration-300 ${hamMenuOpen ? "max-sm:opacity-100 max-sm:pointer-events-auto" : "max-sm:opacity-0 max-sm:pointer-events-none"}`}
                    >

                        {
                            routes.map((route, i) => {
                                return (
                                    <li key={route} className="transition-all duration-200 max-sm:grid max-sm:text-center max-sm:w-full">
                                        <NavLink
                                            to={route}
                                            className={({ isActive }) =>
                                                `${checkIsActive(isActive)} px-5 py-2 rounded text-[var(--water-700)] transition-all duration-200 hover:bg-[var(--water-500)] ${theme} max-sm:p-4`
                                            }
                                        >
                                            {pages[i]}
                                        </NavLink>
                                    </li>
                                );
                            })}
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
                        mobileView ?
                            <HamburgerMenuIcon
                                id="hamIcon"
                                className="h-full w-6"
                                onClick={handleHamIconClick}
                            />
                            :
                            <></>
                    }
                </div>
            </nav>
        </ header >
    );
}

