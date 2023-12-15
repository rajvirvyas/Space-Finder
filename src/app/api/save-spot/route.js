import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
    try {
        const loggedInData = await checkLoggedIn(); // Assuming checkLoggedIn returns the currently logged-in user
        if (loggedInData.loggedIn) {
            const user = await prisma.User.findUnique({
                where: {
                    id: loggedInData.user?.id,
                },
                select: {
                    savedSpaces: true,
                },
            });
            return NextResponse.json(user.savedSpaces);
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function PUT(request) {
    try {
        const loggedInData = await checkLoggedIn(); // Assuming checkLoggedIn returns the currently logged-in user
        if (loggedInData.loggedIn) {
            let { studySpotId } = await request.json();
            // Add the study spot ID to the array of saved IDs on the user
            const user = await prisma.User.findUnique({
                where: {
                    id: loggedInData.user?.id,
                },
            });
            let newSavedSpaces;
            if (user.savedSpaces.includes(studySpotId)) {
                newSavedSpaces = user.savedSpaces.filter(id => id !== studySpotId);
            } else {
                newSavedSpaces = [...user.savedSpaces, studySpotId];
            }
            const updatedUser = await prisma.User.update({
                where: {
                    id: loggedInData.user?.id,
                },
                data: { savedSpaces: newSavedSpaces },
            });
            return NextResponse.json(updatedUser);
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

