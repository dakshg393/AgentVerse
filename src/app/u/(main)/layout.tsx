'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/(shadcn)/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuContent,
} from '@/components/(shadcn)/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/(shadcn)/ui/navigation-menu';
import { navItems } from '@/utils/navUtils.utils';
import { Bell, CreditCard, Home, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/(shadcn)/ui/dropdown-menu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/userStore';
import { useEffect, useState } from 'react';
import useLoadingStore from '@/store/loadingStore';
import {clear} from 'console';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();
  const { loading, setLoading } = useLoadingStore();
  let user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const setUser = useUserStore((state) => state.setUser);
  const logoutUser = useUserStore((state) => state.logoutUser);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await logoutUser();
      router.push('/');
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Network Error');
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const fetchedUser = await getUser();
        console.log(fetchUser);
        if(fetchedUser===null) {
          router.push('/login');
        } else {
          setUser(fetchedUser);
        }
      } catch (error) {
        toast.error('Please login to continue');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    //user layout

    <div className="h-screen w-full flex flex-col  ">
      {/* Main Content */}
      <main className="flex-1  overflow-auto   ">{children}</main>

      {/* Bottom Navigation (Fixed) */}
      <nav className=" flex items-center justify-center fixed bottom-0 md:bottom-4 left-1/2 transform -translate-x-1/2 p-4  rounded-lg shadow-lg border-2  w-full sm:w-auto backdrop-blur-3xl z-100">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap justify-center md:flex-nowrap gap-2 md:gap-4">
            {/* Profile Avatar */}
            <NavigationMenuItem className="border-r-2 border-pink-600  sm:flex  pr-4">
              <Link href="/u/dashboard" legacyBehavior passHref className="bg-transparent">
                <Avatar className="bg-transparent">
                  <AvatarImage className="bg-transparent" src="/logo.jpeg" />
                  <AvatarFallback className="bg-transparent">AV</AvatarFallback>
                </Avatar>
              </Link>
            </NavigationMenuItem>

            {/* Dynamic Navigation Items */}
            {navItems.map((item, index) => {
              const isActive = item.href === pathName;
              return (
                <NavigationMenuItem key={index} className={`${isActive ? 'text-[#ff007f]' : ''}`}>
                  <Link href={item.href} legacyBehavior passHref className="">
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} flex items-center justify-center bg-transparent  flex-col `}
                    >
                      <div className="flex items-center justify-center flex-col">
                        <item.icon size={5} className={`${isActive ? 'text-[#ff007f] ' : ''}`} />
                        <span className="hidden sm:flex">{item.title}</span>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}

            {/* Notifications Icon */}
            <NavigationMenuItem className="border-l-2">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent `}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Bell size={20} className={`hover:text-[#ff007f]  hover:cursor-pointer`} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-110">
                    <DropdownMenuLabel className="p-4">
                      <h1 className="font-semibold ">
                        Notification <Bell />
                      </h1>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-4">
                      NotificationNotificationNotification
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-4">Notification2</DropdownMenuItem>
                    <DropdownMenuItem className="p-4">Notification3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Settings Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent`}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Settings size={50} className={`hover:text-[#ff007f]   hover:cursor-pointer `} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-110">
                    <DropdownMenuLabel>
                      <h1 className="font-semibold">{user?.fullName}</h1>
                      <h1 className="text-sm text-gray-500">{user?.email}</h1>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="p-4 border-b-2  cursor-pointer"
                      onClick={() => router.push('/u/dashboard/profile')}
                    >
                      <span className="flex items-center gap-2 hover:text-[#ff007f]">
                        <User className="hover:text-[#ff007f]" />
                        Profile
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="p-4 border-b-2  cursor-pointer"
                      onClick={() => router.push('/u/dashboard/profile/#subscription')}
                    >
                      <span className="flex items-center gap-2 hover:text-[#ff007f]">
                        <CreditCard className="hover:text-[#ff007f]" />
                        Billing
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="p-4 hover:text-[#ff007f] cursor-pointer "
                      onClick={handleLogout}
                    >
                      <span className="flex items-center gap-2 hover:text-[#ff007f]">
                        <LogOut className="hover:text-[#ff007f]" />
                        Logout
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
