'use client';

import { Button } from '@/components/(shadcn)/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/(shadcn)/ui/card';
import useUserStore from '@/store/userStore';
import axios from 'axios';
import {FileTextIcon, HistoryIcon, PlayIcon} from 'lucide-react';
import {useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';


interface Session{
  _id:string,
  title:string,
  agentType:string,
  createdAt:string,
  status?:string,
}

export default function SessionPage() {
  const [sessions, setSessions] = useState([]);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sess = await axios.get(`/api/c/user/sessions?userId=${user?._id}`);
        console.log(sess.data.data); // Log fetched sessions for debugging
        setSessions(sess.data.data);
      } catch (error) {
        console.log('Error while fetching the session:', error);
      }
    };

    fetchSessions();
  }, []); // Dependency array empty means runs only once after mount


  const handleSessionNavigation = (status:string,sessionId:string)=>{
      if(status==='Start'){
        router.push(`/dashboard/sessions/session/${sessionId}`)
      }else{
        router.push(`/dashboard/some/session/${sessionId}`)
      }
  }




  return (
    <section className="flex items-center justify-center flex-col p-4 min-h-screen pb-20">
      <h1 className="font-bold text-5xl text-center">Sessions History</h1>

      <div className="flex items-center justify-center w-[90%] flex-row gap-10 flex-wrap mt-12">
        {sessions.map((session:Session) => (
          <Card key={session._id} className="w-80 h-60">
            {/* Use key={session._id} or index if no unique ID */}
            <CardHeader>
              {session.title}
            </CardHeader>

            <CardContent>
              {/* Agent type (like ChatGPT, Claude, etc.) */}
              {session.agentType}

              {/* Format date and time */}
              <p>{new Date(session.createdAt).toLocaleString()}</p>
            </CardContent>

            <CardFooter>
             <Button
  className={`w-full flex items-center gap-2 justify-center ${
    session.status === "Start"
      ? "bg-green-600 hover:bg-green-700"
      : session.status === "Resume"
      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
  onClick={() => handleSessionNavigation(session.status ?? "End", session._id)}
>
  {session.status === "Start" ? (
    <>
      <PlayIcon size={16} /> Start Interview
    </>
  ) : session.status === "Resume" ? (
    <>
      <HistoryIcon size={16} /> Resume Session
    </>
  ) : (
    <>
      <FileTextIcon size={16} /> View Summary
    </>
  )}
</Button>
              {/* You could add onClick={() => router.push(...)} if "Start" should do something */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
