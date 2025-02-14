"use client";
import React from 'react'
import { Tags } from '../ui/Tags'
import { Button } from '../ui/Button'
import { ArrowRight, MoveRight } from 'lucide-react'
import { atma } from '../app/fonts'
import { motion } from "motion/react"

export const Hero = () => {
  return (
    <section className='py-40'>
        <motion.div initial={{ opacity: 0, translateY: 20}} animate={{ opacity: 1, translateY: 0 }} transition={{  duration: 0.8 }} className='container mx-auto'>
            <div className='flex flex-col items-center gap-8'>
                <div className='text-xs font-bold'>
                    <Tags>Launch offer: Free for 14 days</Tags>
                </div>
                <div className='text-3xl md:text-5xl lg:text-6xl text-black font-bold transition-all'>
                    <h1 className={atma.className}>Create, Collaborate, and <span className='text-primary'>Share</span> Your Art</h1>
                </div>
                <div className='text-base lg:text-lg max-w-md lg:max-w-2xl text-center text-neutral-600 transition-all'>
                    <p>A powerful drawing application that brings your creativity to life. Work together in real-time, share your creations, and join a community of artists.</p>
                </div>
                <div className='flex gap-4'>
                    <Button className='flex items-center gap-2' variant="primary">Start Drawing Now <ArrowRight className="mt-1" size={18} strokeWidth={2} /></Button>
                    <Button variant="secondary">See Features</Button>
                </div>
            </div>
        </motion.div>
    </section>
  )
}
