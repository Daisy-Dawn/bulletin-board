function paginationMiddleware(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1 // default to first page
        const limit = parseInt(req.query.limit) || 20 //default to 10 items per page
        const skip = (page - 1) * limit

        try {
            //total document count
            const totalDocuments = await model.countDocuments(
                req.query.filters || {}
            )

            //paginated results
            const results = await model
                .find(req.query.filters || {})
                .skip(skip)
                .limit(limit)
                .sort({ likes: -1, timestamp: 1 }) // Sort by likes (desc) and timestamp (asc)

            // Attach pagination info to response
            res.paginatedResults = {
                totalDocuments,
                currentPage: page,
                totalPages: Math.ceil(totalDocuments / limit),
                pageSize: limit,
                data: results,
            }

            next()
        } catch (err) {
            console.error('Pagination error:', err.message)
            res.status(500).json({
                error: 'Internal server error during pagination.',
            })
        }
        console.log(`Pagination middleware invoked for ${req.path}`)
    }
}

module.exports = paginationMiddleware
