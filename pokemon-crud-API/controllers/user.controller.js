const User = require("../models/User.model");

async function getUserByEmail(email) {
    try{
        const user= await User.findOne({ email })
        return user
    } catch (error){
        console.log(error)
    }
}

module.exports = { getUserByEmail }