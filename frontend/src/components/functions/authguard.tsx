'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PageLoader from '../ui/loader/PageLoader'
import { jwtDecode } from 'jwt-decode'
import checkAndRefreshToken from './checkAndRefreshToken'

interface DecodedToken {
    exp: number // Expiration timestamp
    [key: string]: any // Additional fields in the token
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = () => {
            const accessToken = document.cookie
                .split('; ')
                .find((row) => row.startsWith('accessToken='))
                ?.split('=')[1]

            const authToken = sessionStorage.getItem('authToken')

            if (authToken) {
                try {
                    const decoded: DecodedToken = jwtDecode(authToken)
                    const currentTime = Date.now() / 1000 // Convert to seconds

                    if (decoded.exp && decoded.exp > currentTime) {
                        setIsAuthenticated(true) // Token is valid
                    } else {
                        // Token expired
                        sessionStorage.removeItem('authToken')
                        router.push('/auth/login')
                    }
                } catch (error) {
                    console.error('Invalid token:', error)
                    sessionStorage.removeItem('authToken')
                    router.push('/auth/login')
                }
            } else {
                // No valid auth details
                router.push('/auth/login')
            }

            setIsLoading(false)
        }

        checkAuth()
    }, [router])

    useEffect(() => {
        const interval = setInterval(() => {
            checkAndRefreshToken()
        }, 10 * 60 * 1000) // Check every 10 minutes

        return () => clearInterval(interval)
    }, [])

    // Show a loading spinner while authentication is being verified
    if (!isAuthenticated) return <PageLoader />

    return <>{children}</>

    // Show a loading spinner while authentication is being verified
    // if (isLoading) return <PageLoader />

    // return <>{isAuthenticated && children}</>
}
