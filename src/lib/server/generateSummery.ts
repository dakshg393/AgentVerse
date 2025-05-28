import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function generateSummary(history=[] as Array, role = "Software Developer") {
  try {
    let aiInstance:GoogleGenAI;

    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
   
        const prompt = `
You are an AI interview analyzer. Given the following interview histroy  for the role of "${role}", generate a structured summary in this exact format:

---
**Role**: [Job Role]

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
- [Point 5]`;

    const response = await aiInstance.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
           {
      role: 'model',
      parts: [
        {
          text: `${prompt}`,
          type: 'text',
        },
      ],
    }, [...history]],
        
      });




    // const transcript = history
    //   .map(h => `${h.role === 'user' ? 'Interviewer' : 'Candidate'}: ${h.parts.map(p => p.text).join(' ')}`)
    //   .join('\n');



     const candidate = response.candidates[0].content;
      const part = candidate.parts[0];
      const responseText = part.text;
      
    return responseText;

  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
