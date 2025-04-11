'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/(shadcn)/ui/card';

import { useRouter } from 'next/navigation';

import { aiServices } from '@/utils/dashbord.utils';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();

  // const sectionRef = useRef(null);
  // const [vantaEffect, setVantaEffect] = useState(null);

  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       HALO({
  //         el: sectionRef.current,
  //         THREE,
  //         mouseControls: true,
  //         touchControls: true,
  //         minHeight: 100.0,
  //         minWidth: 100.0,
  //         scale: 1.0,
  //         scaleMobile: 0.2,
  //         color: 0x00ffff,
  //         backgroundColor: 0x111111,
  //         size:1.2,

  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  return (
    <section className="flex items-center justify-center flex-col min-h-screen pb-16">
      <span className="text-4xl md:text8xl text-center">
        <h1 className="">Your Personal Ai Agents</h1>
        <h1 className="">Ready To Talk</h1>
      </span>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[80%] md:w-[50%] justify-center ">
        {aiServices.map((service, index) => (
          <Card
            key={index}
            className={`cursor-pointer hover:shadow-lg backdrop-blur-3xl bg-black/50  ${service.color}`}
            onClick={() => router.push(service.href)}
          >
            <CardHeader className="flex flex-col items-center">
              <service.icon size={40} />
              <CardTitle className="mt-2 text-lg font-semibold">{service.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
