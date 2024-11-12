import User from "../models/login.js";
import { setUser, setRefreshUser } from "../service/auth.js";

export const handleUserSignup = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    res.send("Data Added Succesfully.")
};

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) return res.send('Invalid Info.')
    const refreshToken = setRefreshUser(user);

    const token = setUser(user);
    res.cookie("uid", token);

    try {
        await User.updateOne(
            { _id: user._id },
            { $set: { refreshTokens: refreshToken, accessTokens: token } },
        );
    } catch (error) {
        console.log("Error updating refresh token:", error);
        return res.status(500).send("Error updating refresh token.");
    }

    return res.send("LoggedIn Successfully.");
};

export const handleUserInfo = async (req, res) => {
    const uid = req.body.refreshTokens;

    const userr = await User.findOne({ accessTokens: uid });

    return res.send(userr)
};