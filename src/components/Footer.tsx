'use client';

import {footerNavItems} from "@/utils/footer.utils";
import Link from "next/link";



export default function Footer() {
  


  return (
    
      <footer className=" bottom-0 w-full h-80 py-4 px-4 text-center bg-gradient-to-b  to-pink-500 flex flex-col items-center justify-center backdrop-blur-4xl border-t dark:border-white rounded-t-3xl mt-20">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm sm:text-base text-gray-700 ">
            {footerNavItems.map((item)=>(
               <Link href={item.path} passHref legacyBehavior >
                  <p className="hover:text-white hover:cursor-pointer" >{ item.name}</p>
               </Link>
            ))}
            
           
          </div>

          <h1 className="font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl p-4 bg-gradient-to-b from-pink-500 to-white bg-clip-text text-transparent break-words text-center">
            AgentVerse
          </h1>
        </div>
      </footer>
   
  );
}
