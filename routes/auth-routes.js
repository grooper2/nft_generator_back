import express from 'express'
import * as bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import {jwtTokens} from '../utils/jwt-helpers.js'
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req,res) =>{
    try{
        const {email, password} = req.body;

        const user = await prisma.users.findUnique({
            where: {
                user_email: email
            }
        })
        
        //check email
        if(user === null ) return res.status(401).json({error : "Email is incorrect"});
        //check password
        const validPassword = await bcrypt.compare(password, user.user_password);
        if(!validPassword) return res.status(401).json({error:"Incorect password"});
        //JWT
        let tokens = jwtTokens(user);
        //{ httpOnly: true, sameSite: 'none', secure: true} to use cookies on the front-end aswell 
        res.cookie('refresh_token', tokens.refreshToken,{ httpOnly: true });
        res.json(tokens);

    } catch (error) {
        res.status(401).json({error:error.message});
    }
});

router.get('/refresh_token',(req,res)=>{
    try{
        const refreshToken = req.cookies.refresh_token;
        if(refreshToken === null) return res.status(401).json({error:'Null refresh token'});
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error,user)=>{
            if(error) return res.status(403).json({error:error.message});
            let tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken,{ httpOnly: true });
            res.json(tokens);
        })
    } catch(error){
        res.status(401).json({error:error.message});
    }
})

router.delete('/refresh_token', (req,res) =>{
    try{
        res.clearCookie('refresh_token');
        return res.status(200).json({message: 'refresh token deleted '})
    } catch(error){
        res.status(401).json({error:error.message});
    }
})

export default router;