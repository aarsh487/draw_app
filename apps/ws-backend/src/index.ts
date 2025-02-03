import { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
};

const users: User[] = [];

const checkUser = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(typeof decoded == 'string'){
            return null;
        };

        if(!decoded || !decoded.user){
            return null;
        }
        return decoded.user;
    } catch (error) {
        console.log("Error in decoding ws user", error)
        return null;
    }
};

wss.on('connection', function connection(ws, request){
    console.log("Ws server at port: 8080")
    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const user = checkUser(token);
    if(!user){
        console.log("No user found")
        ws.close();
        return null;
    }
    const userId = user.id

    users.push({
        userId,
        rooms : [],
        ws
    });

    ws.on('message', async function message(data){
        let parsedData;
        if(typeof data !== 'string'){
            parsedData = JSON.parse(data.toString());
        } else{
            parsedData = JSON.parse(data);
        }

        if(parsedData.type === "join_room"){
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        };

        if(parsedData.type === 'leave_room'){
            const user = users.find(x => x.ws == ws);
            if(!user){
                return;
            }
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
        }

        if(parsedData.type === 'draw'){
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prisma.chat.create({
                data: {
                    roomId,
                    message,
                    userId
                }
            });

            users.forEach(user => {
                user.ws.send(JSON.stringify({
                    type: 'draw',
                    message: message,
                    roomId
                }))
            });
        };

        if(parsedData.type === "undo"){
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            users.forEach(user => {
                user.ws.send(JSON.stringify({
                    type: 'undo',
                }))
            });    
        }

        if(parsedData.type === "redo"){
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            users.forEach(user => {
                user.ws.send(JSON.stringify({
                    type: 'redo',
                }))
            });    
        }
    })
})