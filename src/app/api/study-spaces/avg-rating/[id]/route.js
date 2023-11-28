import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function PUT(request) {
    const loggedInData = await checkLoggedIn();
    if (loggedInData.loggedIn) {
      const { avgRating, studyID } = await request.json();
      let rating = parseFloat(avgRating);
      try {
        const ss = await prisma.studySpace.update({
          where: {
            id: studyID
          }, 
          data: {
            avgRating: rating
          }
        });
        return NextResponse.json(ss);
      } catch {
        return NextResponse.json({error: 'record not found'}, {status: 401});
      }
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }