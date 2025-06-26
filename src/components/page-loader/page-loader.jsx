import React from 'react'
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';

export default function PageLoader() {
    const theme = useSelector(state => state.themeReducer.theme);
    return (
        <div className={`flex justify-center items-center h-screen w-screen ${theme === "dark" ? "bg-[var(--ash-700)]" : ""}`}>
            {
                theme === "light" ?
                    <PulseLoader speedMultiplier={2} color='#6888fc' />
                    :
                    <PulseLoader speedMultiplier={2} color='white' />
            }
        </div>
    )
}
