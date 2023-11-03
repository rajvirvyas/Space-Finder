import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';
import { checkLoggedIn } from "@/lib/auth";

export async function PUT(request, { params }) {
  const loggedInData = await checkLoggedIn();
  const id = +params.id;
  if (loggedInData.loggedIn && id) {
    const { username, email, password, studySpaces, comments, reservations } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("finding", {id, username, email, password, studySpaces, comments, reservations});
    try {
      const u = await prisma.user.update({
        where: {
          id: id
        }, 
        data: {
          username,
          email,
          password: hashedPassword,
          studySpaces,
          comments,
          reservations
        }
      });
      return NextResponse.json(u);
    } catch {
      return NextResponse.json({error: 'record not found'}, {status: 401});
    }
  }
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}