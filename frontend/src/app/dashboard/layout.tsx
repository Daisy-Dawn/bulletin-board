// RootLayout.tsx
import type { Metadata } from 'next'
import './index.css'
import Header from './_lib/layout/Header'
import Footer from './_lib/layout/Footer'
import SideBar from './sidebar'
import Aside from './aside'
import { ActivePageProvider } from '../../components/context/ActivePageContext'
import MainContent from './_lib/main-dashboard-comps/MainContent'
import AuthGuard from '@/components/functions/authguard'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Create Dashboard Layout',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // If authenticated, render the dashboard layout
    return (
        <AuthGuard>
            <ActivePageProvider>
                <div className="grid grid-cols-6 w-full min-h-full">
                    {/* Sidebar */}
                    <aside className="border-x-[1px] sticky top-0 border-lineGrey">
                        <SideBar />
                    </aside>

                    {/* Main Content and aside bar */}
                    <main className="col-span-5">
                        <Header />

                        <div className="grid bg-[#17181C] px-[2.5rem] py-[1.5rem] gap-[2.5rem] grid-cols-6">
                            <div className="col-span-4">
                                <MainContent />
                            </div>

                            <aside className="col-span-2 sticky top-0">
                                <Aside />
                            </aside>
                        </div>
                        <Footer />
                    </main>
                </div>
            </ActivePageProvider>
        </AuthGuard>
    )
}
