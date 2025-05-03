import { NextRequest, NextResponse } from 'next/server';
import Session from '@/models/(sessionAndAgents)/session.model';
import Interview from '@/models/(agent)/interviewAgent.model';
import { createSession } from '@/helpers/createSession';
import { dbConnect } from '@/dbConfig/dbConfig';

dbConnect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    // console.log(reqBody.data);

    const { jobTitle, jobDiscription, avatar, resume, yearOfExperience, linkdinUrl, skills } =
      reqBody.data;

    if ([jobTitle, jobDiscription, yearOfExperience, linkdinUrl, skills].some((value) => !value)) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    // Create interview details
    const interviewDetails = await Interview.create({
      jobTitle,
      jobDiscription,
      avatar: avatar,
      resume: resume,
      yearOfExperience,
      skills,
      linkdinUrl,
    });

    // Create session
    const sessionDetails = await createSession({
      title: jobTitle,
      createdBy: reqBody.user._id,
      agentType: 'Aiagent',
      agentTypeRef: 'Interview',
      domainData: interviewDetails._id,
    });

    return NextResponse.json(
      {
        message: 'Interview session created successfully',
        data: sessionDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(errorMessage);
    // console.error('Error creating interview session:', error);
    return NextResponse.json({ error: `Internal Server Error ${errorMessage}` }, { status: 500 });
  }
};
