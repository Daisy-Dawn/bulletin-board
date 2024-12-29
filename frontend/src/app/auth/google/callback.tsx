'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageLoader from '@/components/ui/loader/PageLoader'
import Cookies from 'js-cookie'

const GoogleCallback = () => {
    const router = useRouter()

    useEffect(() => {
        // Function to handle fetching the access token and user data from cookies
        const fetchAuthDataFromCookies = () => {
            const accessToken = Cookies.get('userid')
            const user = Cookies.get('user')

            if (accessToken && user) {
                // Parse the user object (since it's stored as a string)
                const parsedUser = JSON.parse(user)

                // Store the access token and user data in sessionStorage or wherever necessary
                sessionStorage.setItem('authToken', accessToken)
                sessionStorage.setItem('user', JSON.stringify(parsedUser))

                // Redirect to the dashboard after successful authentication
                router.push('/dashboard')
            } else {
                console.error('Access token or user data missing in cookies')
            }
        }

        // Call the function to fetch the auth data from cookies
        fetchAuthDataFromCookies()
    }, [router])
    return <PageLoader />
}

export default GoogleCallback
