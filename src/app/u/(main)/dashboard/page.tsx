'use client';

import { Card, CardHeader, CardTitle } from '@/components/(shadcn)/ui/card';
import { useRouter } from 'next/navigation';
import { aiServices } from '@/utils/dashbord.utils';
import { useEffect, useRef, useState } from 'react';
import { clear } from 'console';
// import * as THREE from 'three';
// import HALO from 'vanta/dist/vanta.halo.min';

export default function Dashboard() {
  const router = useRouter();

  // Optional: Vanta background effect
  // const sectionRef = useRef(null);
  // const [vantaEffect, setVantaEffect] = useState(null);

  // useEffect(() => {
  //   if (!vantaEffect && sectionRef.current) {
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
  //         size: 1.2,
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  return (
    <section
      // ref={sectionRef} // Uncomment if using Vanta background
      className="flex items-center pb-16 justify-center flex-col min-h-screen bg-gradient-to-b to-pink-300 bg-no-repeat bg-cover bg-center"
    >
      <span className="mt-10">
        <h1 className="text-6xl font-extrabold font-montserrat text-transparent text-center leading-tight bg-gradient-to-r dark:from-white from-black from-20% to-pink-600 to-[80%] bg-clip-text">
          Meet Your AI Experts
        </h1>
        <p className="mt-4 text-2xl font-medium text-center">
          Always here to help – smart, fast & personalized
        </p>
      </span>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[80%] md:w-[50%] justify-center">
        {aiServices.map((service, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:border-pink-600 border-white backdrop-blur-xs bg-transparent w-80% h-80% text-center"
            onClick={() => router.push(service.href)}
          >
            <CardHeader className="flex flex-col items-center">
              <span className="p-4 rounded-full" style={{ backgroundImage: service.color }}>
                <service.icon size={30} />
              </span>

              <CardTitle className="mt-2 text-lg font-semibold">{service.title || ''}</CardTitle>
              <p>{service.tagline || ''}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
