import React from "react";
import { Button } from "../ui/Button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { atma } from "../app/fonts";

export const Navbar = () => {
  const navLinks = [
    { name: "Home", id: '/' },
    { name: "Rooms", id: '/create-room' },
    { name: "Canvas", id: '/canvas' },
  ];

  return (
    <>
      <section className="py-4 lg:py-4 fixed w-full top-0 z-50 transition-all duration-100">
        <div className="container mx-auto max-w-4xl ">
          <div className="rounded-full md:rounded-full backdrop-blur border border-neutral-400 p-3">
            <div className="flex justify-between items-center">
              <div className="text-primary text-2xl">
                <h1 className={twMerge("font-extrabold", atma.className)}>PincelFlow </h1>
              </div>
              <div className="hidden md:flex gap-8 text-md  pl-25">
                {navLinks.map((nav) => (
                  <div className="text-neutral-600 hover:text-primary" key={nav.id}>
                  <Link className=""  href={nav.id}>
                    {nav.name}
                  </Link>
                  </div>
                ))}
              </div>
              <div className="hidden md:flex gap-4">
                <Button variant="secondary"><Link href={'/signin'}>Sign In</Link></Button>
                <Button variant="primary">Get Started</Button>
              </div>
              <div className="md:hidden text-neutral-600">
                <button>
                  <Menu size={25} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
