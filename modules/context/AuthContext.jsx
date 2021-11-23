import { createContext, useContext, useState } from "react";

import React from 'react'
export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [tokencito, setTokencito] = useState(null)

    return (
        <AuthContext.Provider value={{ tokencito, setTokencito }}>
            {children}
        </AuthContext.Provider>
    )
}
