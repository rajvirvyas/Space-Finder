import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
    const { user } = await checkLoggedIn(request);
    if (!user) {
        return NextResponse.error("Unauthorized", { status: 401 });
    }
    
    const studySpaces = await prisma.studySpace.findMany({
        where: {
            ownerId: user.id
        }
    });
    
    return NextResponse.json(studySpaces);
}