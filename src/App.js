import { useState, useEffect } from 'react';
import Context from './Context'
import Router from './Routes';
import ThemeConfig from './Theme';
import { SnackbarProvider } from 'notistack';

export default function App() {
    // const [loading, setLoading] = useState(false);
    const key_darkmode = 'theme:dark'
    const key_profile = 'account:profile2'
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [accountProfile, setAccountProfile] = useState(null);

    const toggleThisTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        const persistIsDarkMode = localStorage.getItem(key_darkmode)

        if (persistIsDarkMode) {
            // convert to boolean
            setIsDarkMode(persistIsDarkMode === 'true')
        }
    }, [key_darkmode])

    useEffect(() => {
        const profile = localStorage.getItem(key_profile)
        console.log('Profile: ' + profile);
        if (profile) {
            setAccountProfile(JSON.parse(profile));
        }
    }, [key_profile])

    useEffect(() => {
        try {
            localStorage.setItem(key_darkmode, isDarkMode)
        } catch (error) {
            console.warn(error)
        }
    }, [isDarkMode, key_darkmode])

    useEffect(() => {
        console.log('Saving: ' + JSON.stringify(accountProfile));
        try {
            localStorage.setItem(key_profile, JSON.stringify(accountProfile));
        } catch (error) {
            console.warn(error);
        }
    }, [accountProfile, key_profile])

    return (
        <Context.Provider
            value={{
                isDarkMode,
                toggleThisTheme,
                accountProfile,
                setAccountProfile,
                // setLoading
            }}
        >
            <ThemeConfig>
                <SnackbarProvider maxSnack={3}>
                    <Router />
                </SnackbarProvider>
            </ThemeConfig>
        </Context.Provider>
    );
}
