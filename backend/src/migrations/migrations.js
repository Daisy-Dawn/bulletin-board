const Comment = require('../models/Comments')
const Post = require('../models/Post')

const updateLikesSchema = async () => {
    try {
        // Normalize all comments with outdated 'likes' schema
        await Comment.updateMany(
            {
                $or: [
                    { 'likes.count': { $exists: false } },
                    { likes: { $type: 'number' } },
                ],
            },
            { $set: { likes: { count: 0, users: [] } } }
        )

        console.log('Migration updateLikesSchema completed successfully.')
    } catch (err) {
        console.error('Error during updateLikesSchema migration:', err)
    }
}

updateLikesSchema()

const migrateReactionsToLikes = async () => {
    try {
        const posts = await Post.find({})

        for (const post of posts) {
            if (post.reactions && post.reactions.length > 0) {
                const totalLikes = post.reactions.find(
                    (reaction) => reaction.type === 'like'
                )

                const likes = {
                    count: totalLikes ? totalLikes.count : 0,
                    users: totalLikes ? totalLikes.users : [],
                }

                // Update the post document in the database
                await Post.updateOne(
                    { _id: post._id },
                    {
                        $set: { likes },
                        $unset: { reactions: 1 }, // Remove the old `reactions` field
                    }
                )
            }
        }

        console.log('Migration migrateReactionsToLikes completed successfully.')
    } catch (err) {
        console.error('Error during migrateReactionsToLikes migration:', err)
    }
}

migrateReactionsToLikes()

const migrateCommentsandReplies = async () => {
    try {
        // Fetch all comments with a parentCommentId
        const replies = await Comment.find({
            parentCommentId: { $ne: null },
        }).lean()

        for (const reply of replies) {
            // Find the parent comment and push the reply into its `replies` array
            const updatedParent = await Comment.findOneAndUpdate(
                { _id: reply.parentCommentId },
                {
                    $push: {
                        replies: {
                            content: reply.content,
                            userId: reply.userId,
                            timestamp: reply.timestamp,
                            likes: reply.likes,
                        },
                    },
                },
                { new: true }
            )

            if (updatedParent) {
                // Delete the original reply from the top-level collection
                await Comment.deleteOne({ _id: reply._id })
                console.log(
                    `Migrated reply ${reply._id} to parent comment ${reply.parentCommentId}`
                )
            } else {
                console.warn(`Parent comment not found for reply ${reply._id}`)
            }
        }

        console.log('Migration completed')
    } catch (err) {
        console.error('Error during migration:', err)
    }
}

migrateCommentsandReplies()

module.exports = {
    updateLikesSchema,
    migrateReactionsToLikes,
    migrateCommentsandReplies,
}
