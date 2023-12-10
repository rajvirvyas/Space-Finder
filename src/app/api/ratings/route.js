import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function PUT(request) {
    const loggedInData = await checkLoggedIn();

    if (loggedInData.loggedIn) {
        let { 
            value,
            studySpaceID,
            comment,
         } = await request.json();

        const rating = await prisma.Rating.upsert({
            where: {
                userId_studySpaceId: {
                    userId: loggedInData.user?.id,
                    studySpaceId: studySpaceID
                }
            },
            update: {
                value,
                comment,
            },
            create: {
                value,
                userId: loggedInData.user?.id,
                studySpaceId: studySpaceID,
                comment,
            }
        });
        return NextResponse.json(rating);
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
}