'use client'

import React, { useEffect } from 'react'

const ScrollHandler: React.FC = () => {
    useEffect(() => {
        const handleScroll = () => {
            const sidebar = document.getElementById('sidebar')
            const aside = document.getElementById('aside')
            const maxScrollHeight = window.innerHeight * 1.5 // 150vh

            ;[sidebar, aside].forEach((element) => {
                if (element) {
                    const rect = element.getBoundingClientRect()

                    // Check if the bottom of the element exceeds the max height
                    if (window.scrollY + rect.top >= maxScrollHeight) {
                        element.style.position = 'absolute'
                        element.style.top = `${maxScrollHeight}px`
                    } else {
                        element.style.position = 'sticky'
                        element.style.top = '0'
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return null // This component doesn't render anything
}

export default ScrollHandler
