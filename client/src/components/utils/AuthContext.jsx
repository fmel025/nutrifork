import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setLoggedIn(!!storedToken);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext
