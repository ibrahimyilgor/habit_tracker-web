import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

/*REGISTER USER*/

export const register = async (req, res) => {
    try{
        const {
            name,
            surname,
            email,
            password,
            gender,
            birth_date,
            country
        } = req.body

        const salt = await bcrypt.genSalt();
        console.log("pwsalt",name,surname, password, salt, req.body)
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            surname,
            email,
            password: passwordHash,
            gender,
            birth_date,
            country
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
}

/* LOGGING IN */

export const login = async(req, res) => {
    try{
        const {
            email,
            password
        } = req.body

        const user = await User.findOne({ email: email});
        if(!user) return res.status(400).json({msg: "User does not exists."})
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentails."})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user})
    }
    catch (err){
        res.status(500).json({error: err.message});
    }  
}