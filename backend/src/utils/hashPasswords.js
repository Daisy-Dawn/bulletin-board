const bcrypt = require('bcrypt')

const saltRounds = 10

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds) // Asynchronously generate the salt
        const hashedPassword = await bcrypt.hash(password, salt) // Asynchronously hash the password
        return hashedPassword
    } catch (error) {
        console.error('Error hashing password:', error)
        throw new Error('Error hashing password')
    }
}

const comparePassword = async (plain, hashed) => {
    try {
        const isMatch = await bcrypt.compare(plain, hashed) // Asynchronously compare the passwords
        return isMatch
    } catch (error) {
        console.error('Error comparing password:', error)
        throw new Error('Error comparing password')
    }
}

module.exports = { hashPassword, comparePassword }
