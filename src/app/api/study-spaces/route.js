import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  const studySpaces = await prisma.studySpace.findMany();
  return NextResponse.json(studySpaces);
}

export async function POST(request) {
    const loggedInData = await checkLoggedIn();
    if (loggedInData.loggedIn) {
        // add the exact attributes of the schema and update
        const { name, building, long, lat, cap, } = await request.json();
        const studyRoom = await prisma.studySpace.create({
        data: {
            ownerId: loggedInData.user?.id,
            name: name,
            building: building,
            longitude: long,
            latitude: lat,
            capacity: cap
        }
        });
        return NextResponse.json(studyRoom);
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
}