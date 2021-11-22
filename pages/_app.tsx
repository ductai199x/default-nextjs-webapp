import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";



type Theme = "light" | "dark"
type ThemeCtx = {
    theme: Theme
    toggleTheme: () => void
}

export const ThemeCtx = createContext<ThemeCtx>({} as ThemeCtx)

function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState<Theme>("light")

    const toggleTheme = () => {
        setTheme(theme => (theme == "light" ? "dark": "light"));
        localStorage.setItem("theme", theme == "light" ? "dark": "light");
    }

    useEffect(() => {
        if (localStorage.getItem("theme") === "light") {
            setTheme(theme => "light");
        } else if (localStorage.getItem("theme") === "dark") {
            setTheme(theme => "dark");
        }
    })
    
    return(
        <ThemeCtx.Provider value={{ theme, toggleTheme }}>
            <Component {...pageProps} />
        </ThemeCtx.Provider>
    );
}

export default MyApp;
