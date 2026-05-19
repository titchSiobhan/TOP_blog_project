
import { configDotenv  } from 'dotenv';

configDotenv()

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import authRouter from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());



app.get('/', (req, res) => res.send(':)'))

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello'
    })
})
app.use('/', authRouter)
app.post('/api/post',  (req, res) => {
    jwt.verify(req.token, 'secretKey', { expiresIn: '1h' }, (err, authData) => {
        if(err) {
            res.sendStatus(403)
            console.log('not working')
        } else {
            res.json({
        message: 'Post created......',
        authData,
        
    })
    console.log('working')
        }
    })
    
})

app.post('/api/login',  (req, res) => {
    //user
    const user = {
        id: 1,
        username:'Siobhan',
        email: 'siobhan@email.com'
    }
    jwt.sign({user}, 'secretKey', { expiresIn: '1h' }, function(err, token) {
        if (err) {
            return res.status(500).json({ error: 'Token generation failed' });
        }

        res.json({ token });

        console.log(token)
    })
})


app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Hello! This is port ${PORT}!`)
})