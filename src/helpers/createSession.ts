import { dbConnect } from '@/dbConfig/dbConfig';
import Session from '@/models/session.model';
import { NextResponse } from 'next/server';

dbConnect();

export const createSession = async (data) => {
  try {
    const { title, createdBy, agentType, agentTypeRef, domainData,prompt } = data;

    const sessionDetails = await Session.create({
      title,
      createdBy,
      agentType,
      agentTypeRef,
      domainData,
      prompt,
    });

    return sessionDetails;
  } catch (error) {
    return NextResponse.json(
      { error: `Somthing Went Wrong While Creating a session ${error}` },
      { status: 404 }
    );
  }
};
