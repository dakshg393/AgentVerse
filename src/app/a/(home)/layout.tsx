'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/(shadcn)/ui/navigation-menu';
import { Button } from '@/components/(shadcn)/ui/button';
import { AlignJustify, X } from 'lucide-react';
import { navItems } from '@/utils/(admin)/adminNav.utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const pathName = usePathname();

  return (
    <section className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="h-14 w-full px-4 flex items-center justify-between shadow-md border-b-2 ">
        <Button variant="outline" size="icon" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? <X className="w-5 h-5" /> : <AlignJustify className="w-5 h-5" />}
        </Button>
        <h1 className="text-lg font-semibold">Welcome to Admin Dashboard</h1>
        <div></div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            transition-all duration-300 h-screen   items-start shadow-md border-r-2 
            ${isNavOpen ? 'w-56' : 'w-16'}
            ${!isNavOpen ? 'hidden sm:flex' : 'flex'}
            flex-col py-6  
          `}
        >
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-start space-y-2 w-full px-2">
              {navItems.map((item, index) => {
                const isActive = item.href === pathName;
                return (
                  <NavigationMenuItem key={index} className="w-full">
                    <Link href={item.href} passHref>
                      <NavigationMenuLink
                        className={`
                          ${navigationMenuTriggerStyle()}
                          flex items-center w-full py-2 px-3 rounded-md
                          ${isNavOpen ? 'justify-start gap-2' : 'justify-center'}
                          ${isActive ? ' text-pink-600 font-semibold' : ''}
                        `}
                      >
                         <div className="flex items-center justify-center flex-row gap-2">
                        <item.icon size={5} className={`${isActive ? 'text-[#ff007f] ' : ''}`} />
                        {isNavOpen && <span className="hidden sm:flex">{item.title}</span>}
                      </div>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </section>
  );
}
