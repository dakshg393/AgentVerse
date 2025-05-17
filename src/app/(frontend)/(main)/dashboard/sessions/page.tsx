'use client';

import { Button } from '@/components/(shadcn)/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/(shadcn)/ui/card';
import useUserStore from '@/store/userStore';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface Session{
  _id:string,
  title:string,
  agentType:string,
  createdAt:string
}

export default function SessionPage() {
  const [sessions, setSessions] = useState([]);
  const user = useUserStore((state) => state.user);

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

  return (
    <section className="flex items-center justify-center flex-col p-4 min-h-screen pb-16">
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
              <Button className="w-full">
                Start
              </Button>
              {/* You could add onClick={() => router.push(...)} if "Start" should do something */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
