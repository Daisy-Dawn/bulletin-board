'use client'

import React, { createContext, useContext, useState } from 'react'

// Define the context

const ActivePageContext = createContext<{
    activePage: string
    setActivePage: (page: string) => void
}>({ activePage: 'home', setActivePage: () => {} })

// Custom hook for easy access
export const useActivePage = () => useContext(ActivePageContext)

// Provider Component
export const ActivePageProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [activePage, setActivePage] = useState('explore')

    return (
        <ActivePageContext.Provider value={{ activePage, setActivePage }}>
            {children}
        </ActivePageContext.Provider>
    )
}
