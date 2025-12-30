import {UserModel} from "../../../DB/Models/user.model.js";

export const updateProfile = async (req, res, next) => {
    const {name} = req.body;

    req.user.fullname = name;
    req.user.save();
    
    return res.status(200).send({data: {name: req.user.fullname, email: req.user.email}, message: "profile updated successfully"});    
}
