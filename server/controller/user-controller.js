import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Token from '../model/token.js'

export const signupUser = async (request, response) => {
    try {

        const hashed = await bcrypt.hash(request.body.password, 10);
        const user = { username: request.body.username, name: request.body.name, password: hashed };
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({ msg: 'signup succesfully' });

    } catch (error) {
        console.error('Error while signing up user:', error);
        return response.status(500).json({ msg: "Error while signup user" });
    }
}

export const longinUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: "user does not present" });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN)
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN)
            const newToken = new Token({token:refreshToken});
            await newToken.save();
            return response.status(200).json({accessToken,refreshToken,name:request.body.username,username:request.body.username});
        }
        else{
            return response.status(400).json({msg:"password does't match"});
        }
    } catch (error) {
        console.error('Error while logging in user:', error);
        return response.status(400).json({ msg: "Error while login user" });
    }
}