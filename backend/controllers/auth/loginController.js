const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    try {
        //get all data from frontend
        const { email, password } = req.body
        //validation
        if (!(email && password)) {
            return res.status(400).send("All fields are required")
        }
        //find user in db
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist, Please register to create an account." })
        }
        //match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2hr" })
            user.token = token;
            user.password = undefined;
            //cookie section
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            //send a token in user cookie 
            return res.cookie("token", token, options).json({ success: true, token, user })
        } else {
            return res.status(400).json({ error: "Password is Incorrect, Please try again." })
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}