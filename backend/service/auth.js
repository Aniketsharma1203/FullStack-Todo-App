import jwt from "jsonwebtoken";

const secret = "Aniket123@$"
const refreshTokenSecret = "AniketRefresh123@$";

export const setUser = (user) => {
    return jwt.sign({
        _id:user._id,
        email: user.email,
        
    }, secret, { expiresIn: '5m' });
};

export const setRefreshUser = (user) => {
    return jwt.sign({
        _id:user._id,
        email: user.email,
        
    }, refreshTokenSecret, { expiresIn: '7d' });
};

export const getUser = (token) => {
    if (!token) return null;
    return jwt.verify(token, secret)
}

