'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageLoader from '@/components/ui/loader/PageLoader'

const GoogleCallback = () => {
    const router = useRouter()

    useEffect(() => {
        const fetchAuthDataFromUrl = () => {
            // Get accessToken and user from the URL query parameters
            const urlParams = new URLSearchParams(window.location.search)
            const accessToken = urlParams.get('accessToken')
            const user = urlParams.get('user')

            if (accessToken && user) {
                // Parse the user object (since it's passed as a string)
                const parsedUser = JSON.parse(user)

                // Store the access token and user data in sessionStorage
                sessionStorage.setItem('authToken', accessToken)
                sessionStorage.setItem('user', JSON.stringify(parsedUser))

                // Redirect to the dashboard
                router.push('/dashboard')
            } else {
                console.error('Access token or user data missing in URL')
                router.push('/auth/login') // Redirect to login if auth fails
            }
        }

        // Fetch auth data from URL and proceed
        fetchAuthDataFromUrl()
    }, [router])

    return <PageLoader />
}

export default GoogleCallback
