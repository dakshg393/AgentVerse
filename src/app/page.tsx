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
import { Plus, Volume2, VolumeOff, X } from 'lucide-react';
import { faqs, whyUsData, agentsOverview, testimonials } from '@/utils/landingPage.utils.tsx';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/(shadcn)/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/(shadcn)/ui/table';
import { Plans } from '@/utils/subscription.utils';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const [faqIndex, setFaqIndex] = useState(null);

  const toggleFAQ = (index) => {
    setFaqIndex(index === faqIndex ? null : index);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.muted = true;
    }

    setIsMuted((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center flex-col p-0 m-0 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-8 sm:w-[96%] md:w-[80%] p-4 rounded-lg shadow-md border-2 flex justify-between items-center backdrop-blur-lg z-50 flex-wrap">
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
              <Link href="/u/login" passHref legacyBehavior>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent font-bold text-md hover:bg-transparent hover:text-pink-400 hover:underline decoration-2 underline-offset-8`}
                >
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="hover:shadow-pink-400/50">
              <Link href="/u/signup" passHref legacyBehavior>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-pink-400 hover:bg-pink-400 hover:shadow-md hover:shadow-pink-400/50 transition`}
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
        <div className="h-[70vh] w-[90%] flex items-center justify-center flex-col ">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold text-center mt-12 md:mt-0">
            Experience the Power of <br /> Human-like{' '}
            <span className="text-pink-500">AI Interaction</span>
          </h1>
          <p className="mt-10 text-center max-w-xl text-lg text-gray-300">
            AgentVerse brings intelligent conversations to life. Interact with customizable AI
            agents built for productivity, creativity, and human-like responsiveness—all from your
            browser.
          </p>
        </div>
        <div className="h-screen w-screen flex items-start justify-center pt-28">
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

      {/* {AI Agent Overview} */}
      <section className="flex  items-center justify-center  w-screen   flex-col p-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center pb-10">AI Agents Overview</h1>
        <div className="flex items-center justify-start flex-row gap-x-6 overflow-x-auto no-scrollbar w-[80%]">
          {agentsOverview.map((overview, index) => (
            <Card className=" max-w-[280px] aspect-[9/16] p-0 h-[70vh]" key={index}>
              <CardContent className="h-[80%] p-0 ">
                <video
                  className="h-full object-cover rounded-2xl"
                  src={overview.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </CardContent>
              <CardFooter className="h-[20%]">{overview.discription}</CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="flex pt-30 items-center justify-center flex-wrap   flex-col p-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center py-10"> Features </h1>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-4 w-[80%] md:min-h-[60vh] p-4 auto-rows-[minmax(150px,_auto)]">
          {/* Feature 1 - Spans 2 columns */}
          <div className="md:col-span-2 border-2 p-4 rounded-xl  transition-transform duration-300 hover:-translate-y-1  bg-cover bg-center  shadow-sm hover:shadow-md  dark:shadow-white">
            <h3 className="text-lg font-semibold">1Collaboration Tools</h3>
            <p>Real-time collaboration with team chat, tasks, and file sharing.</p>
          </div>
          <div className="row-span-2  border-2 p-4 rounded-xl  transition-transform duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-white">
            <h3 className="text-lg font-semibold">2Collaboration Tools</h3>
            <p>Real-time collaboration with team chat, tasks, and file sharing.</p>
          </div>
          <div className=" p-4 rounded-xl border-2  transition-transform duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md  dark:shadow-white">
            <h3 className="text-lg font-semibold">3Collaboration Tools</h3>
            <p>Real-time collaboration with team chat, tasks, and file sharing.</p>
          </div>{' '}
          <div className="  p-4 rounded-xl border-2  transition-transform duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md  dark:shadow-white">
            <h3 className="text-lg font-semibold">4Collaboration Tools</h3>
            <p>Real-time collaboration with team chat, tasks, and file sharing.</p>
          </div>
        </div>
      </section>

      {/* Why Us?  */}
      <section className="flex pt-30 items-center justify-center flex-col flex-wrap   w-screen gap-4 p-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center pb-10"> Why Us? </h1>
        <div className="rounded-2xl border-2 overflow-x-auto w-[80%] ">
          <Table className="overflow-scroll max-[80%]">
            <TableHeader className="border-b-2">
              <TableRow className="bg-pink-500 hover:bg-pink-500">
                <TableHead className="p-8">Feature</TableHead>
                <TableHead className="p-8">AgentVerse</TableHead>
                <TableHead className="p-8">ChatGPT</TableHead>
                <TableHead className="p-8">Others</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {whyUsData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="p-6">{item.feature}</TableCell>
                  <TableCell className="p-6">{item.agentverse}</TableCell>
                  <TableCell className="p-6">{item.chatgpt}</TableCell>
                  <TableCell className="p-6">{item.others}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* User Testimonials  */}
      <section className="flex pt-30 items-center justify-center flex-wrap  w-screen flex-col p-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center pb-10"> User Testimonials </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 auto-rows-[minmax(150px,_auto)] max-w-[80%]">
          {/* Featured Testimonials (Bigger cards) */}
          <div className="col-span-1 lg:col-span-2 row-span-2 border-2  p-6 rounded-2xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md  dark:shadow-white  ">
            <p className="italic ">
              "Absolutely phenomenal product — our entire team productivity has improved 10x."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img src="/avatar1.jpg" alt="Alice" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold ">Alice Johnson</p>
                <p className="text-sm ">Product Manager, ZapSoft</p>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2 border-2   p-6 rounded-2xl  transition-transform duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md  dark:shadow-white">
            <p className="italic ">
              "The UI is sleek, and the automation tools saved us tons of manual work."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img src="/avatar2.jpg" alt="Mark" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold ">Mark Daniels</p>
                <p className="text-sm ">CEO, BrightTech</p>
              </div>
            </div>
          </div>

          {/* Standard Testimonials (Smaller cards) */}
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className=" shadow p-5 border-2 rounded-2xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 hover:shadow-md dark:shadow-white"
            >
              <p className=" italic">"{testimonial.quote}"</p>
              <div className="mt-4">
                <p className="font-semibold ">{testimonial.name}</p>
                <p className="text-sm ">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      {/* <section className="flex pt-30 items-center justify-center flex-wrap   w-screen  flex-col p-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center pb-10"> Pricing </h1>
        <div className="flex justify-center items-center w-[80%] flex-row md:flex-row gap-4 flex-wrap  ">
          {Plans.map((plan) => {
            return (
              <Card className="hover:-translate-y-2 min-h-[500px] ">
                <CardHeader className="flex justify-center items-center flex-col ">
                  <CardTitle>{plan.planName} </CardTitle>
                  <CardDescription className="text-center">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex items-center justify-center flex-col'>
                  <div>
                    <h1 className="text-center">1{plan.price}</h1>
                  </div>
                  <div>
                    {plan.features.map((feature) => (
                      <li>{feature}</li>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className='bottom-0'>
                  <Button className="w-full">Subscribe Now</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section> */}

      {/* Frequently asked questions */}
      <section className="flex pt-30 items-center justify-center flex-wrap flex-col w-screen p-4 ">
        <h1 className="text-2xl md:text-4xl font-bold text-center pb-10">
          {' '}
          Frequently asked questions{' '}
        </h1>

        <div className="space-y-6  w-full flex items-center justify-center flex-col">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              onClick={() => toggleFAQ(index)}
              className="cursor-pointer w-[80%] md:w-[50%] "
            >
              <CardHeader className="flex justify-between items-center">
                <span>{faq.question}</span>
                {faqIndex === index ? <X /> : <Plus />}
              </CardHeader>
              {faqIndex === index && <CardContent>{faq.answer}</CardContent>}
            </Card>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <section className=" h-auto w-screen flex flex-col items-center justify-start pt-30 gap-20">
        <div className="text-center flex items-center justify-center flex-col gap-4 p-4 ">
          <h1 className="text-3xl md:text-6xl">Unlock the Power of Personalized AI Experts</h1>
          <p className="">
            Get instant insights from legal, health, finance, education, and interview specialists —
            all in one place. Smarter decisions start here.
          </p>
          <Link href="/u/signup" passHref legacyBehavior>
            <Button >Get Started for Free</Button>
          </Link>
         
        </div>

        {/* <footer className=" bottom-0 w-full h-80 py-4 px-4 text-center bg-gradient-to-b  to-pink-500 flex flex-col items-center justify-center backdrop-blur-4xl border-t dark:border-white rounded-t-3xl">
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
</footer> */}
      </section>
      {/* <footer className=" bottom-0 w-full h-80 py-4 px-4 text-center bg-gradient-to-b  to-pink-500 flex flex-col items-center justify-center backdrop-blur-4xl border-t dark:border-white rounded-t-3xl">
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
      </footer> */}
      <Footer />
    </div>
  );
}
