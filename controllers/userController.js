const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//@description Register the User
//@Route POST /api/users/register
//@access public

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body
    
    if(!username || !email || !password){
        
        res.status(400)
        throw new Error("All fields are Mandatory")
    }
    const userAvailable = await User.findOne({username})
    
    if(userAvailable){
        res.status(400)
        throw new Error("username already taken, Try another username")
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if(user){

        res.status(201).json({_id: user.id, email: user.email})
    }
    else{
        res.status(400)
        throw new Error("user data is not valid")
    }
})

//@description Login the User
//@Route POST /api/users/login
//@access public

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Provide email and password")
    }
    const user = await User.findOne({email})
    //compare the passwords
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "20m"})
        res.status(200).json({accessToken})
    }
   else{
    res.status(401)
    throw new Error("email or password is not valid")
   }
})

//@description Display the current login user
//@Route GET /api/users/current
//@access private

const currentUser = asyncHandler(async(req, res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}