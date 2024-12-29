'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import PageLoader from '@/components/ui/loader/PageLoader'

const GoogleCallback = () => {
    const router = useRouter()

    useEffect(() => {
        // Function to fetch auth data from the backend
        const fetchAuthData = async () => {
            try {
                // Fetch data using Axios
                const response = await axios.get(
                    'https://bulletin-board-app-backend.onrender.com/auth/google/callback',
                    {
                        withCredentials: true,
                    }
                )

                // Destructure data from the response
                const { accessToken, user } = response.data

                if (accessToken && user) {
                    // Store in sessionStorage
                    sessionStorage.setItem('authToken', accessToken)
                    sessionStorage.setItem('user', JSON.stringify(user))

                    // Redirect to the dashboard
                    router.push('/dashboard')
                } else {
                    console.error(
                        'Access token or user data missing in response'
                    )
                    router.push('/auth/login') // Redirect to login if auth fails
                }
            } catch (error) {
                console.error('Error during authentication:', error)
                router.push('/auth/login') // Redirect to login in case of error
            }
        }

        // Fetch auth data
        fetchAuthData()
    }, [router])

    return <PageLoader />
}

export default GoogleCallback
