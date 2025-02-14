"use client";
import { Pencil, Share2, Users } from "lucide-react";
import React from "react";
import { Card } from "../ui/Card";
import { motion } from "motion/react"

export const Feature = () => {
  const cardItems = [
    {
      title: "Powerful Tools",
      content:
        "Access a complete set of drawing tools designed for both beginners and professionals.",
      icon: <Pencil />,
    },
    {
      title: "Real-time Collaboration",
      content:
        "Work together with your team in real-time, seeing changes as they happen.",
      icon: <Users />,
    },
    {
      title: "Easy Sharing",
      content:
        "Share your work with a single click and get feedback from the community.",
      icon: <Share2 />,
    },
  ];
  return (
    <section className="py-30">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-center md:px-20 lg:px-72 gap-8">
            {cardItems.map((item) => (
              <motion.div whileHover={{ translateY: -10}} key={item.title} >
                <Card title={item.title} content={item.content} icon={item.icon} />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );  
};
 