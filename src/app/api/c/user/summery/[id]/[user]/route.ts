// import { dbConnect } from '@/dbConfig/dbConfig';
// import redis from '@/lib/server/redis';
// import Session from '@/models/session.model';
// import History from '@/models/history.models';
// import { NextRequest, NextResponse } from 'next/server';
// import {generateSummary} from '@/lib/server/generateSummery';
// import { GoogleGenAI } from '@google/genai';

// dbConnect();

// export async function GET(request: NextRequest, context: RouteContext) {
//   try {
//     const { id, user } =await context.params;


//     // 🔍 Check if summary already exists
//     const existingSession = await Session.findOne({ sessionId: id });
//     if (existingSession?.summery) {
//       return NextResponse.json(
//         {
//           data: existingSession.summery,
//           message: 'Summary already exists, session ended',
//         },
//         { status: 200 }
//       );
//     }

//     // 📦 Get history from Redis
//     const historyKey = `chat:${id}`;
//     const historyJSON = await redis.get(historyKey);
//     let chatHistory = historyJSON ? JSON.parse(historyJSON) : [];
    
//     // 💾 Save to DB if available in Redis
//     if (chatHistory) {
//       await History.create({
//         sessionId: id,
//         createdBy: user,
//         history: chatHistory,
//       });
//     }

//     const sessionHistory = await History.findOne({ sessionId: id });
//     if (!sessionHistory) {
//       return NextResponse.json({ error: 'History not found' }, { status: 404 });
//     }

//     // 📄 Generate summary
    






//     let aiInstance:GoogleGenAI;

//     aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
   
//         const prompt = `You are an AI interview analyzer. Given the following interview histroy  for the role of "${}", generate a structured summary in this exact format:

// ---
// **Role**: [Job Role]

// **Overall Feedback**:  
// [2–3 line overall feedback about the candidate]

// ---

// **Communication Skills**:  
// [2–3 lines on communication quality]  
// **Score**: [X / 100]

// **Technical Knowledge**:  
// [2–3 lines on technical depth]  
// **Score**: [X / 100]

// **Problem-Solving**:  
// [2–3 lines on how they solved problems]  
// **Score**: [X / 100]

// **Team Collaboration**:  
// [2–3 lines on teamwork experience or attitude]  
// **Score**: [X / 100]

// ---

// **Key Suggestions**:
// - [Point 1]
// - [Point 2]
// - [Point 3]
// - [Point 4]
// - [Point 5]`;

//     const response = await aiInstance.models.generateContent({
//         model: 'gemini-2.0-flash',
//         contents: [
//            {
//       role: 'model',
//       parts: [
//         {
//           text: `${prompt}`,
//           type: 'text',
//         },
//       ],
//     }, [...chatHistory]],
        
//       });



//      const candidate = response.candidates[0].content;
//       const part = candidate.parts[0];
//       const responseText = part.text;
      


    
//     // const summery = await generateSummary(chatHistory,"Software");
//      const updatedSummery = await Session.findOneAndUpdate({_id})

//     // ✅ Save summary and mark session ended
//     await Session.findOneAndUpdate(
//       { sessionId: id },
//       {
//         $set: {
//           summery,
//           status: "End", // mark session as ended
//         },
//       },
//       { new: true }
//     );

//     return NextResponse.json(
//       {
//         data: summery,
//         message: 'Summary generated and session marked as ended',
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         error: 'Something went wrong while processing the session',
//       },
//       { status: 500 }
//     );
//   }
// }


import { dbConnect } from '@/dbConfig/dbConfig';
import redis from '@/lib/server/redis';
import Session from '@/models/session.model';
import History from '@/models/history.models';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

dbConnect();

export async function GET(req: Request, context: RouteContext) {
  try{
    const { id, user } =await context.params;

    // 🔍 Check if summary already exists
    const existingSession = await Session.findOne({ sessionId: id });
    if (existingSession?.summery) {
      return NextResponse.json(
        {
          data: existingSession.summery,
          message: 'Summary already exists, session ended',
        },
        { status: 200 }
      );
    }

    // 📦 Get history from Redis
    const historyKey = `chat:${id}`;
    const historyJSON = await redis.get(historyKey);
    const chatHistory = historyJSON ? JSON.parse(historyJSON) : [];

    // 💾 Save to DB if not already saved
    if (chatHistory.length > 0) {
      await History.create({
        sessionId: id,
        createdBy: user,
        history: chatHistory,
      });
    }

    // const sessionHistory = await History.findOne({ sessionId: id });
    // if (!sessionHistory) {
    //   return NextResponse.json({ error: 'History not found' }, { status: 404 });
    // }

    // 📄 Generate summary
    let aiInstance:GoogleGenAI;
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const prompt = `
You are an AI interview analyzer. Given the following interview history for the role of "Software Developer", generate a structured summary in this exact format:

---
**Role**: Software Developer

**Overall Feedback**:  
[2–3 line overall feedback about the candidate]

---

**Communication Skills**:  
[2–3 lines on communication quality]  
**Score**: [X / 100]

**Technical Knowledge**:  
[2–3 lines on technical depth]  
**Score**: [X / 100]

**Problem-Solving**:  
[2–3 lines on how they solved problems]  
**Score**: [X / 100]

**Team Collaboration**:  
[2–3 lines on teamwork experience or attitude]  
**Score**: [X / 100]

---

**Key Suggestions**:
- [Point 1]
- [Point 2]
- [Point 3]
- [Point 4]
- [Point 5]
`;

    
const formattedHistory = chatHistory.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n');
 
    const response = await aiInstance.models.generateContent({
        model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: `${prompt}\n\n${formattedHistory}` }] }],
    });


    const responseText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(responseText)
    if (!responseText) {
      return NextResponse.json({ error: 'AI did not return a valid summary' }, { status: 500 });
    }

    // ✅ Save summary and mark session ended
    const updatedSession = await Session.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          summery: responseText,
          status: 'End',
        },
      },
      { new: true }
    );
    console.log(JSON.stringify("Here is updated histroy",updatedSession))
    return NextResponse.json(
      {
        data: responseText,
        message: 'Summary generated and session marked as ended',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in generating summary:', error);
    return NextResponse.json(
      { error: 'Something went wrong while processing the session' },
      { status: 500 }
    );
  }
}
