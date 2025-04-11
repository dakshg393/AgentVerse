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
  const sectionRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: sectionRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 100.0,
          minWidth: 100.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00ffff,
          backgroundColor: 0x111111,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="flex items-center justify-center flex-col p-0 m-0 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-8 w-[80%] p-4 rounded-lg shadow-lg border-2  flex justify-between items-center backdrop-blur-lg z-50">
        {/* Left Section: Logo */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-3">
            <NavigationMenuItem className="flex items-center justify-center flex-row gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-2xl">Convonex</h1>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section: Login & Signup */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <h1>Login</h1>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/signup" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <h1>Signup</h1>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Sections */}

      <section ref={sectionRef} className="min-h-screen w-screen flex items-center justify-center">
        <h1 className="text-8xl">Talk To Your agent now</h1>
      </section>
    </div>
  );
}
