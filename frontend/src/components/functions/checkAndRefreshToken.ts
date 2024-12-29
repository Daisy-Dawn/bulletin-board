'use client'
import { jwtDecode } from 'jwt-decode'

const checkAndRefreshToken = async () => {
    const authToken = sessionStorage.getItem('authToken')

    if (authToken) {
        const decoded = jwtDecode(authToken)

        const currentTime = Date.now() / 1000

        if (decoded.exp && decoded.exp < currentTime) {
            // Token has expired; refresh it
            try {
                const response = await fetch(
                    'https://bulletin-board-app-backend.onrender.com/auth/refresh-token',
                    {
                        method: 'POST',
                        credentials: 'include', // include cookies
                    }
                )

                const data = await response.json()
                if (response.ok) {
                    sessionStorage.setItem('authToken', data.accessToken)
                } else {
                    console.error('Failed to refresh token:', data.message)
                    sessionStorage.removeItem('authToken')
                }
            } catch (error: any) {
                console.error('Error refreshing token:', error.message)
                sessionStorage.removeItem('authToken')
            }
        }
    }
}

export default checkAndRefreshToken
