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
      <section className="py-4 lg:py-4 fixed w-full top-0 z-50">
        <div className="container mx-auto max-w-4xl ">
          <div className="rounded-full md:rounded-full backdrop-blur border border-neutral-400 p-3">
            <div className="flex justify-between items-center">
              <div className="text-primary text-2xl font-bold">
                <h1 className={atma.className}>Sketch start</h1>
              </div>
              <div className="flex gap-8 text-md text-neutral-600 pl-25">
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
