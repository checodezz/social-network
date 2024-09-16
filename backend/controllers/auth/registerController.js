const User = require("../../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    try {
        //get all data from body
        const { firstname, lastname, email, password } = req.body
        //all data should exist 
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("All fields are compulsory")
        }

        //check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).send("User already exist with this email, Please try logging in.")
        }

        //encrypt the password
        const myEncryptedPassword = await bcrypt.hash(password, 10);

        //save the user in the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: myEncryptedPassword
        })

        //generate  a token for user and send it 
        const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "2h" })
        user.token = token;
        user.password = undefined;

        res.status(201).json(user)

    } catch (error) {
        console.log(error);
    }

}