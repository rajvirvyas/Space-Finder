import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function POST(request) {
  const loggedInData = await checkLoggedIn();
  if (loggedInData.loggedIn) {
    const { studySpaceId, userName, spotName, reason } = await request.json();
    const cmnt = await prisma.report.create({
      data: {
        userName,
        spotName,
        reason,
        ownerId: loggedInData.user?.id,
        studySpaceId
      }
    });
    return NextResponse.json(cmnt);
  }
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}