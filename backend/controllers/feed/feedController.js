const feedController = async (req, res) => {
    try {
        res.send("Welcome to the dashboard");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = feedController