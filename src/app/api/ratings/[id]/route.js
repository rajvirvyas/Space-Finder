import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request, { params }) {
    const studySpaceID = parseInt(params.id);
    const ratings = await prisma.rating.findMany({
        where: {
            studySpaceId: studySpaceID
        }
    });
    return NextResponse.json(ratings);
}