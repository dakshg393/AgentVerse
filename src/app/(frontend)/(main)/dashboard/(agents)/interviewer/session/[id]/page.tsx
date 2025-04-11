'use client';
import { Button } from '@/components/(shadcn)/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/(shadcn)/ui/card';
import { Textarea } from '@/components/(shadcn)/ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { Video } from 'lucide-react';
import Draggable from 'react-draggable';

export default function InterviewPage() {
  const [micOn, setMicOn] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState(false);
  const [responseText, setResponseText] = useState('');

  const videoRef = useRef();
  const [hasCameraAccess, setHasCameraAccess] = useState(false);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraAccess(true);
      } catch (error) {
        console.error('Camera access denied or not available:', error);
        setHasCameraAccess(false);
      }
    };
    getCameraStream();
  }, []);

  return (
    <section className="min-h-screen bg-blue-300 w-full flex items-center justify-start pt-4 px-4  flex-col">
      <h1 className="p-2 text-2xl md:text-4xl m-4 md:m-10">Ai Virtual Interviwer</h1>
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6 md:min-h-full ">
        {/* Left Panel - Video + Caption */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 md:min-h-full  p-2">
          <Card className="p-0 w-full ">
            <CardContent className=" relative  size-80 w-full p-0  rounded-2xl">
              <video
                // ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover  shadow-md rounded-2xl p-2"
              />

              {/* <Draggable bounds="parent"> */}
              <Card className="absolute cursor-move w-30 h-30  shadow-lg right-0 bottom-0 p-0 m-2 ">
                <CardContent className="flex items-center justify-center h-full m-0 p-1 ">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full rounded-md shadow-md p-0 m-0 object-cover"
                  />
                </CardContent>
              </Card>

              {/* </Draggable> */}
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Here is the button for the video controls
              </p>
            </CardFooter>
          </Card>

          <Card className="">
            <CardContent className="py-2">
              <p className="text-sm text-muted-foreground">
                The live caption from your microphone will appear here as preview.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Notes, Code, AI Suggestions */}
        <div className="w-full md:w-1/2">
          <Card className="h-full">
            <CardHeader className="flex gap-2 justify-center">
              <Button variant="outline">Notes</Button>
              <Button variant="outline">Code</Button>
              <Button variant="outline">AI Suggestion</Button>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your notes, code, or AI suggestions here..."
                className="h-40 md:h-64"
              />
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-destructive">
                Do not close this page directly — click on End button.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
