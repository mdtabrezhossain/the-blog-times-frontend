import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const routes = ["/", "/signup"];
    const pages = ["Home", "Signup"];

    function checkIsActive(isActive) {
        return isActive ? "bg-[var(--water-500)]" : "";
    }

    return (
        <header className="bg-[var(--water-100)] shadow-md">
            <nav className=" flex justify-between items-center h-14 px-6">
                <h1 className="text-[var(--water-700)] font-bold text-2xl">The Blog Times</h1>
                <ul className="flex gap-6">
                    {routes.map((route, i) => {
                        return (
                            <li key={route}>
                                <NavLink
                                    to={route}
                                    className={({ isActive }) =>
                                        `${checkIsActive(isActive)} px-5 py-2 rounded text-[var(--water-700)] font-bold transition-all duration-300 hover:bg-[var(--water-500)]`
                                    }
                                >
                                    {pages[i]}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header >
    );
}
