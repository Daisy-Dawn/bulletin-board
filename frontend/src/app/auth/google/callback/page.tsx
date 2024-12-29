'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import PageLoader from '@/components/ui/loader/PageLoader'

const GoogleCallback = () => {
    const router = useRouter()

    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                // Make the request to the Google callback route
                const response = await axios.get('/auth/google/callback', {
                    withCredentials: true, // Ensure cookies are sent with the request
                })

                // Get tokens and user data from the response headers
                const accessToken = response.headers['x-access-token']
                const user = response.headers['x-user']

                if (accessToken && user) {
                    // Parse the user object (since it's passed as a string)
                    const parsedUser = JSON.parse(user)

                    // Store the access token and user data in sessionStorage
                    sessionStorage.setItem('authToken', accessToken)
                    sessionStorage.setItem('user', JSON.stringify(parsedUser))

                    // Redirect to the dashboard
                    router.push('/dashboard')
                } else {
                    console.error(
                        'Access token or user data missing in response headers'
                    )
                    router.push('/auth/login') // Redirect to login if auth fails
                }
            } catch (error) {
                console.error('Authentication failed:', error)
                router.push('/auth/login') // Redirect to login if something went wrong
            }
        }

        // Fetch auth data and proceed
        fetchAuthData()
    }, [router])

    return <PageLoader />
}

export default GoogleCallback
