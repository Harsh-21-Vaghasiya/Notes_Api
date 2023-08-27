const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRETKEY;

const signup = async (req, res) => {

    // set variable for user data
    const { username, email, password } = req.body;


    // Cheak for any existing user or not in database
    try {
        const existinguser = await userModel.findOne({ email: email });

        if (existinguser) {
            return res.status(400).json({ message: "user already exists" });
        }


        // Create hash password

        const hashpassword = await bcrypt.hash(password, 10);


        // Creating userModel


        const result = await userModel.create({
            email: email,
            password: hashpassword,
            username: username
        });


        // JWT Authentication token generation  function

        const token = jwt.sign({ email: result.email, id: result._id }, SECRETKEY);
        res.status(201).json({ user: result, token: token });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while creating' });
    }


};
const signin = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const userExists = await userModel.findOne({ email: email });

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matchpassword = await bcrypt.compare(password, userExists.password);

        if (!matchpassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ email: userExists.email, id: userExists._id }, SECRETKEY);
        res.status(200).json({ token: token, user: userExists });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }

};

module.exports = { signin, signup };