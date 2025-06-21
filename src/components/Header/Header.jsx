import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { toggleThemeAction } from '../../store/slices/ThemeSlice';
import "./Header.css"

export default function Navbar() {
    const routes = ["/", "/signup"];
    const pages = ["Home", "Signup"];
    const theme = useSelector(state => state.themeReducer.theme);
    const dispatch = useDispatch();

    function handleThemeIconClick() {
        dispatch(toggleThemeAction());
    }

    function checkIsActive(isActive) {
        if (isActive && theme === "light") {
            return "bg-[var(--water-500)]";
        }
        if (isActive && theme === "dark") {
            return "bg-[var(--ash-500)]";
        }
    }

    return (
        <header className={`bg-[var(--water-100)] shadow-md transiton-all duration-300 ${theme}`} >
            <nav className="flex justify-between items-center h-14 px-10">
                <h1 className={`text-[var(--water-700)] font-bold text-2xl ${theme}`}>The Blog Times</h1>
                <ul className="flex gap-6">
                    {
                        routes.map((route, i) => {
                            return (
                                <li key={route}>
                                    <NavLink
                                        to={route}
                                        className={({ isActive }) =>
                                            `${checkIsActive(isActive)} px-5 py-2 rounded text-[var(--water-700)] font-bold transition-all duration-200 hover:bg-[var(--water-500)] ${theme}`
                                        }
                                    >
                                        {pages[i]}
                                    </NavLink>
                                </li>
                            );
                        })}
                    <div onClick={handleThemeIconClick} className={`text-[var(--water-700)] cursor-pointer transition-all duration-200 hover:scale-[1.3] ${theme}`}>
                        {
                            theme === "light" ?
                                <MoonIcon className="h-full w-6" /> :
                                <SunIcon className="h-full w-6" />
                        }
                    </div>
                </ul>
            </nav>
        </ header >
    );
}
