import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import prisma from  '../lib/prisma.js'

async function signUp(req, res) {
    try{
    const { userEmail, username, firstName, lastName, password, confirmPassword} = req.body;
  
    if (password !== confirmPassword) {
       return res.status(400).json({ message: "Passwords don't match" });

    }
    
    const existing = await prisma.user.findUnique({
        where: {userEmail}
    })

    if (existing) {
        return res.status(409).json({ message: "Email already in use" });
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4()

    const user = await prisma.user.create({
        data: {
            id,
            userEmail,
            username,
            firstName,
            lastName,
            password: hashedPassword
        }
    })
    console.log('user created');
    return res.json({
        message: 'User created',
        user
    })
} catch (err){
 console.log(err);
 return res.status(500).json({error:"Signup failed", details: err.message})
}
}

async function login(req, res) {
    const { userEmail, password }  =  req.body 

    const user = await prisma.user.findUnique({
        where: { userEmail }
    })

    if (!user) {
        return res.json({
            error: 'Incorrect email'
        })
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.json({
            error: "Password incorrect"
        })
    }

    const token = jwt.sign(
        {   
            user: {
                id: user.id,
                username: user.username
            }
        },
            process.env.JWT_SECRET,
             {expiresIn: '3hr'}
    );
    res.json({
        user,
        token
    })
}

export {
    signUp, login
}