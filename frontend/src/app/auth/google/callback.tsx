'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageLoader from '@/components/ui/loader/PageLoader'

const GoogleCallback = () => {
    const router = useRouter()

    useEffect(() => {
        const { accessToken, user } = router.query

        // Ensure accessToken is a string
        if (typeof accessToken === 'string' && user) {
            const parsedUser = JSON.parse(user as string) // Type assertion for user

            // Store the access token in sessionStorage or cookies
            sessionStorage.setItem('accessToken', accessToken)
            sessionStorage.setItem('user', JSON.stringify(parsedUser))

            // Redirect to the dashboard after successful authentication
            router.push('/dashboard')
        } else {
            console.error('Access token or user data missing')
        }
    }, [router.query])

    return <PageLoader />
}

export default GoogleCallback
