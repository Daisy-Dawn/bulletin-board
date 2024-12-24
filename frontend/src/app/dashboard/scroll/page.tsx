import React from 'react'

const Scroll = () => {
    return (
        <div style={styles.container}>
            {/* Left Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarContent}>
                    <p>Menu Item 1</p>
                    <p>Menu Item 2</p>
                    <p>Menu Item 3</p>
                    <p>Menu Item 4</p>
                    <p>Menu Item 5</p>
                </div>
            </div>

            {/* Main Feed */}
            <main style={styles.mainContent}>
                {Array.from({ length: 100 }, (_, i) => (
                    <div key={i} style={styles.feedItem}>
                        Feed Item {i + 1}
                    </div>
                ))}
            </main>

            {/* Right Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarContent}>
                    <p>Profile 1</p>
                    <p>Profile 2</p>
                    <p>Profile 3</p>
                    <p>Profile 4</p>
                    <p>Profile 5</p>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        // overflow: 'hidden',
    } as React.CSSProperties,
    sidebar: {
        flex: '0 0 200px',
        backgroundColor: '#f0f0f0',
        overflowY: 'auto' as const, // Explicitly casting 'auto' as a valid value for overflowY
        borderRight: '1px solid #ddd',
        borderLeft: '1px solid #ddd',
        position: 'sticky' as const, // Explicitly cast to "sticky"
        top: 0,
        height: '100vh',
    },
    sidebarContent: {
        padding: '20px',
    },
    mainContent: {
        flex: 1,
        overflowY: 'visible' as const, // Explicitly casting 'visible' as a valid value for overflowY
        backgroundColor: '#fff',
        padding: '20px',
    },
    feedItem: {
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
}

export default Scroll
