"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Plus, Trash, UsersRound } from 'lucide-react'
import { createRoom, deleteRoom, getAllRooms } from '../draw/http';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

interface RoomType {
    id: string;
    adminId: string;
    slug: string;
    date: string
}

export const CreateRoom = () => {
    const [ roomName, setRoomName ] = useState("");
    const [rooms, setRooms ] = useState<RoomType[]>([]);

    const router = useRouter();

    const allRooms = useCallback(async() => {
        const rooms = await getAllRooms();
        if(rooms){
            setRooms(rooms);
        }
    },[rooms]);

    const handleDeleteRoom = async (roomId: string) => {
        const room = rooms.filter((r) => r.id !== roomId)
        console.log(room);
        setRooms(room);
        await deleteRoom(roomId);
    }

    const handleCreateRoom = async () => {
          const room = await createRoom(roomName);
          if (room) {
            setRooms((prev) => [...prev, room]);
          } else {
            console.error("Room creation failed.");
          }
    };

    useEffect(() => {
        allRooms();   
    },[]);
      
  return (
    <div className="h-100vh bg-gradient-to-tr from-slate-50 to-violet-50">
    <Navbar />
    <div className="pt-30 flex justify-center items-center">
      <motion.div  initial={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }} className="w-[800px] bg-white p-12 flex flex-col gap-8 rounded-xl">
        <div className="text-black font-semibold text-2xl">
          <h2>Create or Join a Room</h2>
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-4 gap-4">
          <Input
            onChange={(e) => setRoomName(e.target.value)}
            className="lg:col-span-4 col-span-3"
            type="text"
            placeholder="Enter room name"
          />
          <Button onClick={handleCreateRoom} className="col-span-1 flex items-center justify-center gap-1" size="lg" variant="primary">
            <Plus className="pt-1" size={20} /> <span className="lg:text-base text-sm">create</span>
          </Button>
        </div>
        <div className="text-black flex flex-col gap-6">
          <h4>Active Rooms</h4>
          <div className="grid grid-cols gap-4">
            {rooms.map((room, i) => (
              <div
                key={i}
                className="grid grid-cols-10 bg-slate-50 rounded-xl p-4"
              >
                <h4 className="col-span-8">{room.slug}</h4>
                <div className="col-span-1 flex items-center gap-1 text-neutral-600">
                  <button onClick={() => handleDeleteRoom(room.id)} className="col-span-1 bg-white py-1 cursor-pointer"><Trash size={20} strokeWidth={2.5} /></button>
                  </div>
                <button onClick={() => router.push(`/canvas/${room.id}`)} className="col-span-1 bg-white py-1 cursor-pointer">join</button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  )
}
  