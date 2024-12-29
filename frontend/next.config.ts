import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ['dribbble.com'], // Add allowed domains here
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|swf|avi)$/,
            type: 'asset/resource',
        })

        return config
    },
}

export default nextConfig
