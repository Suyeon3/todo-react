import { createContext, useContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [darkIsOn, setDarkIsOn] = useState(false);
    const toggleDarkMode = () => {
        setDarkIsOn(!darkIsOn);
        updateDarkMode(!darkIsOn);
    }

    // DarkModeProvider가 처음 마운트될때 localStorage의 theme 값을 읽어옴
    useEffect(() => {
        const isDark =
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkIsOn(isDark);
        updateDarkMode(isDark);
    }, []);

    return (
        <DarkModeContext.Provider value={{ darkIsOn, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

function updateDarkMode(darkIsOn) {
    if (darkIsOn) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

export const useDarkMode = () => useContext(DarkModeContext);