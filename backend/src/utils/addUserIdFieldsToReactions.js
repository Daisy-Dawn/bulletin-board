const mongoose = require('mongoose')
const Post = require('../models/Post')
const migrateReactions = async () => {
    try {
        const posts = await Post.find()

        for (const post of posts) {
            let isUpdated = false

            // Define the default reaction types
            const defaultReactions = ['like', 'thumbs-up', 'thumbs-down', 'wow']

            // Ensure the default reactions are present
            defaultReactions.forEach((type) => {
                if (
                    !post.reactions.some((reaction) => reaction.type === type)
                ) {
                    post.reactions.push({ type, count: 0, users: [] })
                    isUpdated = true
                }
            })

            // Optional: Clean up reactions with invalid data
            post.reactions = post.reactions.filter((reaction) => {
                const isValid =
                    defaultReactions.includes(reaction.type) &&
                    reaction.count >= 0
                if (!isValid) isUpdated = true
                return isValid
            })

            if (isUpdated) {
                await post.save()
                console.log(`Updated post ${post._id}`)
            }
        }

        console.log('Migration completed.')
    } catch (err) {
        console.error('Error during migration:', err)
    }
}

module.exports = migrateReactions
