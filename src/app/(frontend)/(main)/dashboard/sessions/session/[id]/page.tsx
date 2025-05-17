// 'use client';
// import { Button } from '@/components/(shadcn)/ui/button';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/(shadcn)/ui/card';
// import { useEffect, useRef, useState } from 'react';
// import { Camera, CameraOff, Mic, MicOff, PlayCircleIcon, StopCircle } from 'lucide-react';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// export default function InterviewPage() {
//   const [settings, setSettings] = useState({
//     camOn: true,
//     micOn: true,
//   });
//   const mediaRecorderRef = useRef(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioChunks, setAudioChunks] = useState([]);
//   const [transcription, setTranscription] = useState('');
//   const [isTranscribing, setIsTranscribing] = useState(false);
//   const [transcriptionError, setTranscriptionError] = useState('');

//   const streamRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const getUserMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: true,
//         });
//         streamRef.current = stream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = new MediaStream([stream.getVideoTracks()[0]]);
//         }
//       } catch (error) {
//         console.error('Camera and Microphone access denied:', error);
//         if (videoRef.current) {
//           videoRef.current.srcObject = null;
//         }
//       }
//     };

//     getUserMedia();

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!streamRef.current) return;

//     streamRef.current.getAudioTracks().forEach((track) => {
//       track.enabled = settings.micOn;
//     });

//     streamRef.current.getVideoTracks().forEach((track) => {
//       track.enabled = settings.camOn;
//     });

//     if (videoRef.current) {
//       videoRef.current.srcObject = settings.camOn ? streamRef.current : null;
//     }
//   }, [settings.micOn, settings.camOn]);

//   const startRecording = () => {
//     if (!streamRef.current) return;

//     const audioStream = new MediaStream(streamRef.current.getAudioTracks());
//     const mediaRecorder = new MediaRecorder(audioStream, {
//       audioBitsPerSecond: 128000,
//       mimeType: 'audio/webm',
//     });
//     mediaRecorderRef.current = mediaRecorder;

//     const chunks = [];
//     setAudioChunks([]);
//     setTranscription('');
//     setTranscriptionError('');

//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         chunks.push(event.data);
//       }
//     };

//     mediaRecorder.onstop = async () => {
//       const audioBlob = new Blob(chunks, { type: 'audio/webm' });
//       const message = await transcribeAudio(audioBlob);

//       try {
//         const response = await axios.post('/api/c/chat', {
//           message: message,
//         });

//         console.log(response.data);
//       } catch (error) {
//         console.error('API call failed:', error);
//         alert('Failed to send message');
//       }
//     };

//     mediaRecorder.start(500);
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const transcribeAudio = async (audioBlob) => {
//     setIsTranscribing(true);
//     setTranscriptionError('');

//     try {
//       // Step 1: Upload audio file to AssemblyAI
//       const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
//         method: 'POST',
//         headers: {
//           Authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY || '',
//           'Transfer-Encoding': 'chunked',
//         },
//         body: audioBlob,
//       });

//       const { upload_url } = await uploadResponse.json();

//       // Step 2: Submit transcription request
//       const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
//         method: 'POST',
//         headers: {
//           Authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY || '',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           audio_url: upload_url,
//           speaker_labels: true,
//           language_code: 'en_us',
//         }),
//       });

//       const transcriptionData = await transcriptionResponse.json();
//       const transcriptId = transcriptionData.id;

//       // Step 3: Poll for results
//       let transcriptText = '';
//       let pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

//       while (!transcriptText) {
//         const pollingResponse = await fetch(pollingEndpoint, {
//           headers: {
//             Authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY || '',
//           },
//         });

//         const pollingData = await pollingResponse.json();

//         if (pollingData.status === 'completed') {
//           transcriptText = pollingData.text;
//           break;
//         } else if (pollingData.status === 'error') {
//           throw new Error(pollingData.error);
//         }

//         // Wait for 1 second before polling again
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       }

//       setTranscription(transcriptText);
//       return transcriptText;
//     } catch (error) {
//       console.error('Transcription error:', error);
//       setTranscriptionError(`Transcription failed: ${error.message}`);
//     } finally {
//       setIsTranscribing(false);
//     }
//   };

//   const toggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       if (settings.micOn) {
//         startRecording();
//       } else {
//         toast('Please Turn on Your Mic', {
//           icon: '🎙️',
//         });
//       }
//     }
//   };

//   return (
//     <section className="min-h-screen bg-blue-300 w-full flex items-center justify-start pt-4 px-4 flex-col">
//       <h1 className="p-2 text-2xl md:text-4xl m-4 md:m-10">AI Virtual Interviewer</h1>
//       <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6 md:min-h-full">
//         <div className="flex flex-col w-full md:w-1/2 gap-2 md:min-h-full p-2 bg-amber-200">
//           <Card className="p-0 w-full">
//             <CardContent className="relative size-80 w-full p-0 rounded-2xl">
//               <video
//                 autoPlay
//                 playsInline
//                 className="w-full h-full object-cover shadow-md rounded-2xl p-2"
//               />

//               <Card className="absolute cursor-move w-30 h-30 shadow-lg right-0 bottom-0 p-0 m-2">
//                 <CardContent className="flex items-center justify-center h-full m-0 p-1">
//                   <video
//                     ref={videoRef}
//                     autoPlay
//                     playsInline
//                     className="w-full h-full rounded-md shadow-md p-0 m-0 object-cover"
//                   />
//                 </CardContent>
//               </Card>
//             </CardContent>
//             <CardFooter className="justify-center gap-2">
//               <Button onClick={() => setSettings((prev) => ({ ...prev, micOn: !prev.micOn }))}>
//                 {settings.micOn ? <Mic /> : <MicOff />}
//               </Button>
//               <Button onClick={() => setSettings((prev) => ({ ...prev, camOn: !prev.camOn }))}>
//                 {settings.camOn ? <Camera /> : <CameraOff />}
//               </Button>
//               <Button onClick={toggleRecording} disabled={isTranscribing}>
//                 {isRecording ? <StopCircle /> : <PlayCircleIcon />}
//               </Button>
//             </CardFooter>
//           </Card>

//           <Card className="mt-4">
//             <CardHeader>
//               <h2 className="text-lg font-semibold">Transcription</h2>
//             </CardHeader>
//             <CardContent>
//               {isTranscribing ? (
//                 <p className="text-muted-foreground">Transcribing audio...</p>
//               ) : transcriptionError ? (
//                 <p className="text-red-500">{transcriptionError}</p>
//               ) : transcription ? (
//                 <div className="whitespace-pre-wrap">{transcription}</div>
//               ) : (
//                 <p className="text-muted-foreground">
//                   {isRecording ? 'Recording in progress...' : 'No transcription available'}
//                 </p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';
import { Button } from '@/components/(shadcn)/ui/button';
import { Card, CardContent, CardFooter } from '@/components/(shadcn)/ui/card';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, PlayCircleIcon, StopCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function InterviewPage() {
  const [settings, setSettings] = useState({
    camOn: true,
    micOn: true,
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = new MediaStream([stream.getVideoTracks()[0]]);
        }
      } catch (error) {
        console.error('Camera and Microphone access denied:', error);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };

    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis;
    }

    getUserMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (synthesisRef.current?.speaking) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!streamRef.current) return;

    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = settings.micOn;
    });

    streamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = settings.camOn;
    });

    if (videoRef.current) {
      videoRef.current.srcObject = settings.camOn ? streamRef.current : null;
    }
  }, [settings.micOn, settings.camOn]);

  const startRecording = () => {
    if (!streamRef.current) return;

    const audioStream = new MediaStream(streamRef.current.getAudioTracks());
    const mediaRecorder = new MediaRecorder(audioStream, {
      audioBitsPerSecond: 128000,
      mimeType: 'audio/webm',
    });
    mediaRecorderRef.current = mediaRecorder;

    const chunks: Blob[] = [];
    setAudioChunks([]);
    setTranscription('');
    setTranscriptionError('');

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    // mediaRecorder.onstop = async () => {
    //   const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    //   const message = await transcribeAudio(audioBlob);

    //   try {
    //     const response = await axios.post('/api/c/chat', {
    //       message: message,
    //     });

    //     if (response.data?.response) {
    //       speakText(response.data.response);
    //     }
    //   } catch (error) {
    //     console.log('API call failed:', error);
    //     toast.error('Failed to Communicate with Virtual Agent');
    //   }
    // };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });

      // Run async code outside of the event handler
      (async () => {
        const message = await transcribeAudio(audioBlob);
        try {
          const response = await axios.post('/api/c/chat', { message });
          if (response.data?.response) {
            speakText(response.data.response);
          }
        } catch (error) {
          console.log('API call failed:', error);
          toast.error('Failed to Communicate with Virtual Agent');
        }
      })();
    };

    mediaRecorder.start(500);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    setTranscriptionError('');

    try {
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY || '',
          'Transfer-Encoding': 'chunked',
        },
        body: audioBlob,
      });

      const { upload_url } = await uploadResponse.json();

      const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: upload_url,
          speaker_labels: true,
          language_code: 'en_us',
        }),
      });

      const transcriptionData = await transcriptionResponse.json();
      const transcriptId = transcriptionData.id;

      let transcriptText = '';
      const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

      while (!transcriptText) {
        const pollingResponse = await fetch(pollingEndpoint, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY || '',
          },
        });

        const pollingData = await pollingResponse.json();

        if (pollingData.status === 'completed') {
          transcriptText = pollingData.text;
          break;
        } else if (pollingData.status === 'error') {
          throw new Error(pollingData.error);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setTranscription(transcriptText);
      return transcriptText;
    } catch (error) {
      console.error('Transcription error:', error);
      setTranscriptionError(
        `Transcription failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      return '';
    } finally {
      setIsTranscribing(false);
    }
  };

  const speakText = (text: string) => {
    if (!synthesisRef.current) {
      console.error('Speech synthesis not supported');
      return;
    }

    if (synthesisRef.current.speaking) {
      synthesisRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    const voices = synthesisRef.current.getVoices();
    utterance.voice = voices.find((v) => v.lang === 'en-US') || voices[0];
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesisRef.current.speak(utterance);
  };

  const toggleRecording = () => {
    if (isSpeaking) {
      synthesisRef.current?.cancel();
      setIsSpeaking(false);
      return;
    }

    if (isRecording) {
      stopRecording();
    } else {
      if (settings.micOn) {
        startRecording();
      } else {
        toast('Please Turn on Your Mic', {
          icon: '🎙️',
        });
      }
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-start  flex-col">
      <h1 className="p-2 text-2xl md:text-4xl m-4 ">AI Virtual Interviewer</h1>
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6 md:min-h-6/8   items-center justify-center">
        <div className="flex flex-col w-full md:w-1/2 gap-2  p-2 ">
          <Card className="p-0 w-full">
            <CardContent className="relative size-80 w-full p-0 rounded-2xl">
              <video
                autoPlay
                playsInline
                className="w-full h-full object-cover shadow-md rounded-2xl p-2"
              />

              <Card className="absolute cursor-move w-30 h-30 shadow-lg right-0 bottom-0 p-0 m-2">
                <CardContent className="flex items-center justify-center h-full m-0 p-1">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full rounded-md shadow-md p-0 m-0 object-cover"
                  />
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="justify-center gap-2">
              <Button onClick={() => setSettings((prev) => ({ ...prev, micOn: !prev.micOn }))}>
                {settings.micOn ? <Mic /> : <MicOff />}
              </Button>
              <Button onClick={() => setSettings((prev) => ({ ...prev, camOn: !prev.camOn }))}>
                {settings.camOn ? <Camera /> : <CameraOff />}
              </Button>
              <Button
                onClick={toggleRecording}
                disabled={isTranscribing}
                variant={isSpeaking ? 'destructive' : 'default'}
              >
                {isSpeaking ? <StopCircle /> : isRecording ? <StopCircle /> : <PlayCircleIcon />}
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardContent>
              {isTranscribing ? (
                <p className="text-muted-foreground">Transcribing audio...</p>
              ) : transcriptionError ? (
                <p className="text-red-500">{transcriptionError}</p>
              ) : transcription ? (
                <div className="whitespace-pre-wrap">{transcription}</div>
              ) : (
                <p className="text-muted-foreground">
                  {isRecording ? 'Recording in progress...' : 'No transcription available'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
