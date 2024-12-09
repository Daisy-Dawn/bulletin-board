const mongoose = require('mongoose')

const dropIndexIfExists = async () => {
    try {
        const indexes = await mongoose.connection.db
            .collection('users')
            .indexes()
        if (indexes.some((index) => index.name === 'googleId_1')) {
            await mongoose.connection.db
                .collection('users')
                .dropIndex('googleId_1')
            console.log('Dropped googleId index.')
        } else {
            console.log('googleId index does not exist, skipping.')
        }

        // Ensure sparse index
        await mongoose.connection.db
            .collection('users')
            .createIndex({ googleId: 1 }, { unique: true, sparse: true })
        console.log('Created sparse unique index for googleId.')
    } catch (error) {
        console.error('Error managing indexes:', error.message)
    }
}

module.exports = dropIndexIfExists
