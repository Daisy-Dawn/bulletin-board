import React from 'react'
import './pageloader.css'

const PageLoader: React.FC = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            <div className="loader"></div>
        </div>
    )
}

export default PageLoader
