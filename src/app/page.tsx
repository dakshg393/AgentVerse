'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/(shadcn)/ui/navigation-menu';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/(shadcn)/ui/avatar';
import { useRef, useState } from 'react';
import { Button } from '@/components/(shadcn)/ui/button';
import { Volume2, VolumeOff } from 'lucide-react';
import {feqs} from "@/utils/landingPage.utils";

export default function LandingPage() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const [feqIndex,setFeqIndex] = useState()
  const toggleMute = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.muted = true;
    }

    setIsMuted(prev => !prev);
  };

  return (
    <div className="flex items-center justify-center flex-col p-0 m-0 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-8 sm:w-[96%] md:w-[80%] p-4 rounded-lg shadow-lg border-2 flex justify-between items-center backdrop-blur-lg z-50 flex-wrap">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-3">
            <NavigationMenuItem className="flex items-center justify-center flex-row gap-2">
              <Avatar>
                <AvatarImage src="/logo.jpeg" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <h1 className="font-bold md:text-2xl">AgentVerse</h1>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <Link href="/login" passHref legacyBehavior>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent font-bold text-md hover:bg-transparent hover:text-pink-400 hover:underline decoration-2 underline-offset-8`}
                >
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="hover:shadow-pink-400/50">
              <Link href="/signup" passHref legacyBehavior>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-pink-400 hover:bg-pink-400 hover:shadow-lg hover:shadow-pink-400/50 transition`}
                >
                  <h1>Try It Out</h1>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Hero Section */}
      <section className=" w-screen flex items-center justify-center pt-20 flex-wrap flex-col text-center  ">
       <div className='h-[70vh] w-[90%] flex items-center justify-center flex-col '>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold text-center mt-12 md:mt-0">
          Experience the Power of <br /> Human-like <span className="text-pink-500">AI Interaction</span>
        </h1>
        <p className="mt-10 text-center max-w-xl text-lg text-gray-300">
          AgentVerse brings intelligent conversations to life. Interact with customizable AI agents
          built for productivity, creativity, and human-like responsiveness—all from your browser.
        </p>
        </div>
        <div className='h-screen w-screen flex items-start justify-center pt-28'>
        <div className="flex items-center justify-center flex-wrap h-[80%] w-[80%]   rounded-2xl  relative overflow-hidden  ">
          <Button
            onClick={toggleMute}
            className="absolute top-5 left-5 z-10 w-15 h-15 rounded-full"
          >
            {isMuted ? <VolumeOff /> : <Volume2 />}
          </Button>

          <video
            ref={videoRef}
            className="  rounded-2xl rounded-b-none object-cover w-full h-full  inset-shadow-sm inset-shadow-amber-500"
            src="/demovideo1.mp4"
            autoPlay
            muted
            playsInline
            loop
          />
          {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none " /> */}
          <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-[#000024] to-transparent pointer-events-none rounded-b-2xl" />

        </div>
        </div>
      </section>


      <section className='flex items-center justify-center flex-wrap h-screen w-screen'>
        <h1>AI Agent Overview</h1>
        <div>
          
        </div>
      </section>

      <section className='flex items-center justify-center flex-wrap h-screen w-screen'>
        <h1> Features </h1>
       
      </section>
      <section className='flex items-center justify-center flex-wrap h-screen w-screen'>
        <h1> Why Us? </h1>
       
      </section>
      <section className='flex items-center justify-center flex-wrap h-screen w-screen'>
        <h1> User Testimonials  </h1>
       
      </section>
      <section className='flex items-center justify-center flex-wrap h-screen w-screen'>
        <h1> Pricing   </h1>
       
      </section>
      <section className='flex items-center justify-center flex-wrap h-screen w-screen'>
        <h1 className='text-3xl md:text-6xl'> Frequently asked questions  </h1>

        <div className="space-y-6">


         
        </div>
       
      </section>
      <section className='relative h-screen w-screen flex flex-col items-center justify-start pt-30 gap-8'>
  <div className='text-center flex items-center justify-center flex-col gap-4'>
    <h1 className='text-3xl md:text-6xl'>Unlock the Power of Personalized AI Experts</h1>
    <p className=''>Get instant insights from legal, health, finance, education, and interview specialists — all in one place. Smarter decisions start here.</p>
    <Button>Get Started for Free</Button>
  </div>

  <footer className="absolute bottom-0 w-full h-[50%] py-4 px-4 text-center bg-gradient-to-b  to-pink-500 flex flex-col items-center justify-center backdrop-blur-4xl border-t border-white rounded-t-3xl">
  <div className="flex flex-col items-center justify-center gap-4 w-full">
    <div className="flex flex-wrap items-center justify-center gap-8 text-sm sm:text-base text-gray-700 ">
      <p className="hover:text-white hover:cursor-pointer">Contact Us</p>
      <p className="hover:text-white hover:cursor-pointer">Terms & Conditions</p>
      <p className="hover:text-white hover:cursor-pointer">Privacy Policy</p>
    </div>

    <h1 className="font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl p-4 bg-gradient-to-b from-pink-500 to-white bg-clip-text text-transparent break-words text-center">
      AgentVerse
    </h1>
  </div>
</footer>

</section>

    </div>
  );
}
