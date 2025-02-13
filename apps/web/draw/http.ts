import axios from "axios";
import { axiosInstance, HTTP_BACKEND } from "../config";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chat/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}

export async function deleteAllShapes(roomId: string) {
    try {
        const res = await axiosInstance.delete(`/canvas/clear/${roomId}`);
    } catch (error) {
        console.log("delete error")
    }
}

export async function createRoom(roomName: string) {
    const token = localStorage.getItem("authorization");
    console.log(roomName);
    try {
        const res = await axiosInstance.post(`/room`, { roomName }, { headers: { Authorization: token}});
        console.log(res.data.room);
        return res.data.room;
    } catch (error) {
        console.log("create room error");
    }
}

export async function getAllRooms() {
    const token = localStorage.getItem("authorization");
    try {
        const res = await axiosInstance.get(`/room`, { headers: { Authorization: token}});
        console.log(res.data.rooms);
        return res.data.rooms;
    } catch (error) {
        console.log("get room error");
    }
}

export async function deleteRoom(roomId: string) {
    const token = localStorage.getItem("authorization");
    try {
        const res = await axiosInstance.delete(`/room/${roomId}`, { headers: { Authorization: token}});
        return res.data;
    } catch (error) {
        console.log("delete room error");
    }
}