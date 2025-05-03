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

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min'; // Change to your preferred effect

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center flex-col p-0 m-0 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-8 w-[80%] p-4 rounded-lg shadow-lg border-2  flex justify-between items-center backdrop-blur-lg z-50">
        {/* Left Section: Logo */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-3">
            <NavigationMenuItem className="flex items-center justify-center flex-row gap-2">
              <Avatar>
                <AvatarImage src="/logo.jpeg" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-2xl">AgentVerse </h1>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section: Login & Signup */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}  bg-transparent font-bold text-md  hover:bg-transparent hover:text-pink-400 hover:underline decoration-2 underline-offset-8  `}
                >
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="hover:shadow-pink-400/50">
              <Link href="/signup" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`    ${navigationMenuTriggerStyle()}
        bg-pink-400 
        hover:bg-pink-400 
        hover:shadow-lg 
        hover:shadow-pink-400/50 
        transition `}
                >
                  <h1>Try It Out</h1>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Sections */}

      <section
        className="min-h-screen w-screen flex items-center justify-center p-20 flex-wrap"
        style={{
          background: 'linear-gradient(135deg, #22222E 0%, #3A2B52 100%)',
        }}
      >
        <h1 className="text-7xl text-center font-extrabold ">
          {' '}
          Experience the Power <br />
          of Human-like AI Interaction
        </h1>
      </section>
    </div>
  );
}
