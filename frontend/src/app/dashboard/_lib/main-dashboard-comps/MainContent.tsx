'use client'
import React from 'react'
import { useActivePage } from '@/components/context/ActivePageContext'
import Explore from './Explore'
import CommunityFeed from './CommunityFeed'
import MutualFeed from './MutualFeed'
import Messages from '../header-comps/Messages'
import Notifications from '../header-comps/Notifications'
import Community from '../sidebar-comps/Community'
import NewsFeed from '../sidebar-comps/NewsFeed'
import People from '../sidebar-comps/People'
import Profile from '../sidebar-comps/Profile'

const MainContent = () => {
    const { activePage } = useActivePage()

    const renderPage = () => {
        switch (activePage) {
            case 'explore':
                return <Explore />
            case 'communityFeed':
                return <CommunityFeed />
            case 'mutualFeed':
                return <MutualFeed />
            case 'messages':
                return <Messages />
            case 'notifications':
                return <Notifications />
            case 'community':
                return <Community />
            case 'newsFeed':
                return <NewsFeed />
            case 'people':
                return <People />
            case 'profile':
                return <Profile />
            default:
                return <Explore />
        }
    }
    return <div> {renderPage()} </div>
}

export default MainContent
