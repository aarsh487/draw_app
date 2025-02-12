// 'use client';

import { Navbar } from "../../components/Navbar";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Plus, UsersRound } from "lucide-react";

function page() {
  const rooms = [
    { name: "iron bank", user: 4 },
    { name: "iron bank", user: 4 },
    { name: "iron bank", user: 4 },
  ];

  return (
    <div className="h-100vh bg-gradient-to-tr from-slate-50 to-violet-100">
      <Navbar />
      <div className="pt-30 flex justify-center items-center">
        <div className="w-[800px] bg-white p-12 flex flex-col gap-8 rounded-xl">
          <div className="text-black font-semibold text-2xl">
            <h2>Create or Join a Room</h2>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <Input
              className="col-span-4"
              type="text"
              placeholder="Enter room name"
            />
            <Button variant="primary">
              <Plus />
            </Button>
          </div>
          <div className="text-black flex flex-col gap-6">
            <h4>Active Rooms</h4>
            <div className="grid grid-cols gap-4">
              {rooms.map((room, i) => (
                <div
                  key={i}
                  className="grid grid-cols-14 bg-slate-50 rounded-xl p-4"
                >
                  <h4 className="col-span-12">{room.name}</h4>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <p>
                      <UsersRound size={16} strokeWidth={1.25} />
                    </p>
                    <p>{room.user}</p>
                  </div>
                  <button className="bg-white py-1 cursor-pointer">join</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
