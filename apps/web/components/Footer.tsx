import { Github, Linkedin } from "lucide-react";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { atma } from "../app/fonts";

export const Footer = () => {
  const produict = [
    { name: "Canvas", href: "#canvas" },
    { name: "Rooms", href: "#rooms" },
    { name: "Features", href: "#features" },
  ];

  const resources = [
    { name: "Documentation", href: "#canvas" },
    { name: "Tutorials", href: "#rooms" },
    { name: "Blog", href: "#features" },
  ];

  const company = [
    { name: "About", href: "#canvas" },
    { name: "Careers", href: "#rooms" },
    { name: "Contact", href: "#features" },
  ];

  return (
    <section className="bg-gradient-to-tr from-slate-50 to-violet-100 ">
      <div className="container mx-auto pl-8 lg:pl-50 py-12">
        <div className="grid grid-cols-4 gap-6">
          <div className="flex flex-col gap-4">
            <h4 className={twMerge("text-primary text-lg", atma.className)}>PincelFlow </h4>
            <p className="text-sm text-black/80">
              Create, collaborate, and share your artwork with the world.
            </p>
            <div className="flex gap-6 text-black/90">
              <Github size={18} />
              <Linkedin size={18} />
              <FaXTwitter />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-md text-black font-semibold pb-2">Product</h4>
            {produict.map((item) => (
              <div key={item.name} className="text-neutral-500">
                <a className="text-sm">{item.name}</a>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-md text-black font-semibold pb-2">Resources</h4>
            {resources.map((item) => (
              <div key={item.name} className="text-neutral-500">
                <a className="text-sm">{item.name}</a>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-md text-black font-semibold pb-2">Company</h4>
            {company.map((item) => (
              <div key={item.name} className="text-neutral-500">
                <a className="text-sm">{item.name}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border border-neutral-100"></div>
        <div className="text-neutral-400 text-sm text-center p-8">
          <p>© 2025 Sketch Space. All rights reserved.</p>
        </div>
    </section>
  );
};
