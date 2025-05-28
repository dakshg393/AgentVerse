
'use client';
import { Button } from '@/components/(shadcn)/ui/button';
import { Card, CardContent, CardFooter } from '@/components/(shadcn)/ui/card';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, PlayCircleIcon, StopCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useParams, useRouter} from 'next/navigation';
import useUserStore from '@/store/userStore';

export default function SummeryPage() {

    const [sessionSummery,setSessionSummery] = useState("")
    const params= useParams()
    const sessionId = params.id
    const userId= useUserStore((state)=>state.user?._id)

  useEffect(() => {
  const getSessionSummery = async () => {
    
    try {
      const summery = await axios.get(`/api/c/user/summery/${sessionId}/${userId}`);
      console.log(summery.data.data);
      setSessionSummery(summery.data.data)
      
    } catch (error) {
      // console.log(error)
      // toast.error(`Somthing Went Wrong Cant genrate the summmery`);
      // router.push('/u/dashboard/sessions')
    }
  };

  getSessionSummery();
}, [sessionId, userId]); 


  return (
    <section className='min-h-screen w-full flex items-center justify-start  flex-col pb-24'>
    <h1 className='text-4xl font-bold p-6'>Summery</h1>
        <div className='w-[80%]'>
    {/* <p>
  ### 📝 Interview Summary – React Developer<br /><br />
  Candidate: Daksh Gupta<br />
  Position: React Developer<br />
  Date: [Insert Date]<br />
  Interviewer: [Insert Interviewer's Name]<br />
  Duration: 45 minutes<br /><br />
  ### ✅ Technical Evaluation<br /><br />
  React Knowledge:<br />
  Daksh has a solid grasp of React fundamentals, including components, props, state management, and lifecycle methods. He confidently discussed how React's virtual DOM works and its role in optimizing rendering performance.<br /><br />
  Hooks & State Management:<br />
  He showed a strong understanding of React Hooks such as <code>useState</code>, <code>useEffect</code>, and <code>useMemo</code>, and explained practical use cases for each. He also discussed using Redux Toolkit and Context API effectively, and was clear about when to use each one.<br /><br />
  Project Discussion:<br />
  Daksh shared details about a blog application he built. It includes features like real-time content editing, dynamic routing with slugs, and global state management using Redux. The project uses Tailwind CSS for styling and Appwrite as a backend. He explained his thought process well, especially around performance optimizations and managing complex form inputs.<br /><br />
  Live Coding Task:<br />
  He was given a task to build a searchable and filterable list using React. He completed the task smoothly, using hooks and clean component structures. The code was readable and logically organized.<br /><br />
  ### 💬 Communication & Soft Skills<br /><br />
  Daksh communicates clearly and explains his decisions thoughtfully. He listens carefully, asks relevant questions, and seems open to collaboration and feedback. He demonstrated confidence without being overbearing, which is a good sign for team dynamics.<br /><br />
  ### 🟢 Overall Impression<br /><br />
  Daksh is technically strong in React and has hands-on experience building full-featured front-end applications. He’s familiar with modern tools and best practices, and his approach to building scalable UIs is solid. Overall, he seems like a good fit for a React-focused role.<br /><br />
  Recommendation: Proceed to the next round / Strong hire<br />
  Suggestions for Growth: Continue exploring performance profiling in React and improve familiarity with accessibility best practices.
</p> */}
<p>{sessionSummery}</p>

        </div>
    </section>
  );
}
