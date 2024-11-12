import { getUser } from "../service/auth.js";

export const restrictToLoggedinUserOnly = async(req,res,next) => {
    const userUID = req.cookies.uid;

    if(!userUID) return res.redirect("/login");

    const user = getUser(userUID);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
};