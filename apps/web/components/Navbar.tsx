import React from "react";
import { Button } from "../ui/Button";
import { atma } from "../app/layout";

export const Navbar = () => {
  const navLinks = [
    { name: "Home", id: "#home" },
    { name: "Rooms", id: "#rooms" },
    { name: "Canvas", id: "#canvas" },
  ];
  return (
    <>
      <section className="bg-white py-4 lg:py-4 fixed w-full top-0 z-50">
        <div className="container mx-auto max-w-5xl">
          <div className="border border-white/15 rounded-[27px] md:rounded-full backdrop-blur">
            <div className="flex justify-between items-center">
              <div className="text-primary text-xl font-bold">
                <h1 className={atma.className}>Sketch start</h1>
              </div>
              <div className="flex gap-8 text-md text-neutral-400 pl-25">
                {navLinks.map((nav) => (
                  <a key={nav.id} href={nav.id}>
                    {nav.name}
                  </a>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="secondary">Sign In</Button>
                <Button variant="primary">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
