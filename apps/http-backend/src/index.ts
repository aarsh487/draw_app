import express from 'express';
import { prisma } from '@repo/db/client';
import { RoomSchema, SignInSchema, SignUpSchema } from '@repo/common/config';
import { JWT_SECRET } from '@repo/backend-common/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middlewate';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', async(req, res) => {
    try {
        const { data, error } = SignUpSchema.safeParse(req.body);
        if(error){
            res.status(403).json({ success: false, message: error.issues.map(err => err.message) });
            return;
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data?.email
            }
        });

        if(existingUser){
            res.status(403).json({ success: false, message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const newUser = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        });

        res.status(200).json({ success: true, message: "Sign up successfull" });
        return;
    } catch (error) {
        console.log("Error in sign up", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});

app.post('/signin', async(req, res) => {
    try {
        const { data, error } = SignInSchema.safeParse(req.body);
        if(error){
            res.status(403).json({ success: false, message: error.issues.map(err => err.message) });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                email: data?.email
            }
        });

        if(!user){
            res.status(403).json({ success: false, message: "User does not exists" });
            return;
        }

        const hashedPassword = await bcrypt.compare(data.password, user.password);
        if(!hashedPassword){
            res.status(403).json({ success: false, message: "Incorrect Password" });
            return;
        }

        const token = jwt.sign({ user }, JWT_SECRET)
        res.status(200).json({ success: true, message: "Sign in successfull", token });
        return;
    } catch (error) {
        console.log("Error in sign in", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});

app.post('/room', authMiddleware, async(req, res) => {
    try {
        const { data, error } = RoomSchema.safeParse(req.body);
        if(error){
            res.status(403).json({ success: false, message: error.issues.map(err => err.message) });
            return;
        }
        const userId = req.user.id;
        const room = await prisma.room.create({
            data: {
                slug: data.name,
                adminId: userId
            }
        });

        res.status(200).json({ success: true, message: "Room created successfully ", room });
    } catch (error) {
        console.log("Error in creating room", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});

app.get('/chat/:roomId', async(req, res) => {
    try {
        const roomId = req.params.roomId;
        const messages = await prisma.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: 'desc'
            },
            take: 50
        });
        res.status(200).json({ success: true, messages });

    } catch (error) {
        console.log("Error in geting messages", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});

app.get('/room/:slug', authMiddleware, async(req, res) => {
    try {
        const slug = req.params.slug;
        const room = await prisma.room.findFirst({
            where: {
                slug
            }
        });
        res.status(200).json({ success: true, room });
    } catch (error) {
        console.log("Error in gettin room", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
})

app.listen(5000, () => {
    console.log("hello form server 5000");
})