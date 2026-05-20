import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import prisma from  '../lib/prisma.js'

async function signUp(req, res) {
    const { userEmail, username, firstName, lastName, password, confirmPassword} = req.body;
  
    if (password !== confirmPassword) {
        res.json({
            message: "Passwords don't match"
        });
    }

    const existing = await prisma.user.findUnique({
        where: {userEmail}
    })

    if (existing) {
        res.json({
            message: "Email already in use"
        })
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
    console.log('user created')
}

async function login(req, res) {
    const { userEmail, password }  =  req.body 

    const user = await prisma.user.findUnique({
        where: {userEmail}
    })

    if (!user) {
        res.json({
            error: 'Incorrect email'
        })
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        res.json({
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
             {expiresIn: '1hr'}
    );
    res.json({
        message: user.firstName,
        token
    })
}

export {
    signUp, login
}