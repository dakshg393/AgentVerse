"use client"

import {Button} from "@/components/(shadcn)/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/(shadcn)/ui/card";
import useUserStore from "@/store/userStore";
import axios from "axios";
import {useEffect, useState} from "react";


export default function SessionPage() {

  const [sessions,setSessions]= useState([])
  let user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sess = await axios.get(`/api/c/user/sessions?userId=${user._id}`);
        console.log(sess.data.data);
        setSessions(sess.data.data)
      } catch (error) {
        console.log("Error while fetching the session:", error);
      }
    };
  
    fetchSessions();
  }, []);
  return ( 
  <section className="flex items-center justify-center flex-col  p-4 min-h-screen pb-16 ">
      <h1 className="font-bold text-5xl text-center">Sessions History </h1>
     <div className="flex items-center justify-center w-[90%] flex-row gap-10 flex-wrap mt-12 ">
      
      
      
      
     
      {sessions.map((session)=>(

    
<Card className="max-w-60 max-h-80">
<CardHeader>
    {session.title}
</CardHeader>
<CardContent>
  {session.agentType}

  <p>{new Date(session.createdAt).toLocaleString()}</p>

</CardContent>
<CardFooter>
  <Button className="w-full">Start</Button>
</CardFooter>
</Card>


      ))}
   

     </div>
    </section>

      )
}
