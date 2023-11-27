import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";
import { useSearchParams } from 'next/navigation'

// in order to call this API, you must provide field to the url
// i.e. /api/comments?ssid=1
export async function GET(request) {
  const searchParams = useSearchParams()
  const ssid = searchParams.get('ssid')
  const comments = await prisma.comment.findMany({
    where: {
      studySpaceId: {
        equals: ssid
      }
    }
  });
  return NextResponse.json(comments);
}

export async function POST(request) {
  const loggedInData = await checkLoggedIn();
  if (loggedInData.loggedIn) {
    const { ssid, text } = await request.json();
    const cmnt = await prisma.comment.create({
      data: {
        text,
        ownerId: loggedInData.user?.id,
        studySpaceId: ssid
      }
    });
    return NextResponse.json(cmnt);
  }
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}