'use client'
import axios from 'axios'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import '../../dashboard/index.css'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FcUnlock } from 'react-icons/fc'
import { HiLockOpen } from 'react-icons/hi'
import { FaRegEye } from 'react-icons/fa'
import { FaRegEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { CircularProgress, Alert } from '@mui/material'

interface RegisterFormData {
    username: string
    password: string
}
interface Errors {
    username: string
    password: string
}

export default function Register() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState<{
        type: 'success' | 'error'
        message: string
    } | null>(null)
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState<Errors>({
        username: '',
        password: '',
    })
    const [revealPassword, setRevealPassword] = useState(false)
    const [isValidated, setIsValidated] = useState(false)

    const toggleRevealPassword = () => {
        setRevealPassword(!revealPassword)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: '' })

        // Dynamically update the validation state
        const isValid = validateInputs({ ...formData, [name]: value })
        setIsValidated(isValid)
    }

    const validateInputs = (data: RegisterFormData = formData) => {
        const newErrors: Errors = {
            username: '',
            password: '',
        }

        if (data.username.trim() === '') {
            newErrors.username = 'Username is required!'
        }

        if (data.password.trim() === '') {
            newErrors.password = 'Password is required!'
        }

        setErrors(newErrors)

        return !Object.values(newErrors).some((error) => error !== '')
    }

    // handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validateInputs()) {
            try {
                setLoading(true)
                const response = await axios.post(
                    'https://bulletin-board-app-backend.onrender.com/auth/login',
                    formData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                )

                console.log('Login response data:', response.data)

                const { accessToken } = response.data
                sessionStorage.setItem('authToken', accessToken)

                setAlert({ type: 'success', message: 'Login successful!' })
                router.push('/dashboard')
                setLoading(false)
            } catch (error: any) {
                console.error(
                    'Error during login:',
                    error.response?.data || error.message
                )
                setAlert({
                    type: 'error',
                    message:
                        error.response?.data?.message ||
                        'An error occurred during login.',
                })
                setLoading(false)
            }
        } else {
            setAlert({ type: 'error', message: 'Please fill in all fields.' })
        }
    }

    return (
        <div className="min-h-screen login-background flex justify-center items-center relative">
            {/*  background */}
            <video
                id="login-video"
                // src="/media/video/tree.mp4"
                src="/media/video/texture.mp4"
                // src="/media/video/globe.mp4"
                poster="/media/video/background1.mp4"
                loop
                muted
                autoPlay
            ></video>

            <div className="login-form w-1/3 min-h-[50vh] glass-background bg-opacity-30 rounded-xl z-30 shadow-lg flex flex-col gap-[2rem] items-center px-[3rem] py-[2.5rem]">
                {/* logo */}
                <div className="flex items-center gap-4">
                    <div className="w-[45px] h-[45px] flex justify-center items-center border-lineGrey border-[1px] bg-primary rounded-full">
                        <Image
                            className="w-[35px] h-[35px] object-contain"
                            src="/media/images/logo.png"
                            alt="app logo image"
                            width={35}
                            height={35}
                        />
                    </div>
                    <h2 className="text-primary text-[22px] font-semibold">
                        Kaloka
                    </h2>
                </div>

                {/* sign in form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col gap-[1.5rem] text-secondary"
                    // action="post"
                >
                    {/* header text */}
                    <div className="text-center flex flex-col gap-1">
                        <h2 className="font-semibold text-[28px] ">
                            Sign in to your account
                        </h2>
                        <p className="text-[15px]">
                            Login with your username or other platforms
                        </p>
                    </div>

                    {/* google */}
                    <button className="rounded-lg py-2 px-2 flex items-center justify-center h-10 gap-2 hover:bg-blue-700 bg-royalBlue">
                        <FcGoogle />
                        <p>Sign in with Google</p>
                    </button>

                    {/* local login */}
                    <div className="flex items-center justify-center gap-1">
                        <div className="h-[1.5px]  w-full login-line-gradient"></div>
                        <p className="w-full text-nowrap text-center">
                            or login with username
                        </p>
                        <div className="h-[1.5px] w-full login-line-gradient"></div>
                    </div>

                    {/* username */}
                    <div className="flex flex-col">
                        <div className="flex gap-3 items-center border-[1px] rounded-md border-lineGrey py-[10px] px-[15px] ">
                            <span className="">
                                <FaUser size={19} />
                            </span>
                            <input
                                className="outline-none w-full bg-transparent "
                                type="text"
                                name="username"
                                placeholder="john-williams"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.username && (
                            <p className="text-red-400 text-[0.75rem]">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* password */}
                    <div className="flex flex-col">
                        <div className="flex gap-3 items-center justify-between border-[1px] rounded-md border-lineGrey py-[10px] px-[15px] ">
                            <button type="button" className="">
                                <HiLockOpen size={19} />
                            </button>
                            <input
                                className="outline-none w-full bg-transparent "
                                type={revealPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="password12345"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                onClick={() => toggleRevealPassword()}
                                type="button"
                                className=""
                            >
                                {revealPassword ? (
                                    <FaRegEye size={19} />
                                ) : (
                                    <FaRegEyeSlash />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-400 text-[0.75rem]">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* forgot password */}
                    <p className="text-right text-[13px] text-primary">
                        Forgot Password?
                    </p>

                    {/* submit button */}
                    <button
                        className={`rounded-md py-2 px-2 flex items-center justify-center h-12 gap-2   login-button-glass-background bg-opacity-30 z-50 shadow-lg ${
                            isValidated ? 'bg-[#9d377ebb]' : 'bg-[#55535523]'
                        }`}
                    >
                        <p>Sign in </p>
                        {loading && (
                            <CircularProgress size={25} color="inherit" />
                        )}
                    </button>
                </form>
            </div>

            {alert && (
                <div className="absolute z-50 top-3 w-full flex justify-center">
                    <Alert
                        variant="filled"
                        className="w-1/2"
                        onClose={() => setAlert(null)}
                        severity={alert.type}
                    >
                        {alert.message}
                    </Alert>
                </div>
            )}
        </div>
    )
}
