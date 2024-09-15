require("dotenv").config();
const cors = require("cors")
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");

const loginRegisterRoutes = require("./routes/loginAndRegister");
const userRoutes = require("./routes/userRoutes")

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "*",
    credentials: true
}

app.use(cors(corsOptions));
/* 
app.get("/", (req, res) => {
    res.send("<h1>Server is Working.</h1>")
});
 */

/* 
app.post("/register", async (req, res) => {
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

});
 */
/* 
app.post("/login", async (req, res) => {
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
})

 */
//

// app.get("/feed", auth, async (req, res) => {
//     res.send("Welcome to dashboard")
// })

app.use("/api", loginRegisterRoutes);
app.use("/api", userRoutes);


module.exports = app