import { prisma } from "@/lib/prima";
import { NextResponse } from "next/server";
import * as argon2 from "argon2";

export async function GET(
  request: Request,
  { params }: { params: Promise <{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return NextResponse.json(
        { message: `Invalid not ID`, code: `BAD_REQUEST`, statusCode: 400, details: { id: [`Invalid request parameters. User ID must be a positive integer.`] } },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: numericId,
      },
      select: {
        id: true,
        username: true,
        lastname: true,
        email: true,
        roleId: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: `User not found`, code: `NOT_FOUND`, statusCode: 404, },
        { status: 404 },
      );
    }
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server Fail", code: `SERVER_ERROR`, statusCode: 500 }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const numId = Number(id)
    const body = await request.json();
    if (!Number.isInteger(numId) || numId <= 0) {
      return NextResponse.json({ message: `Invalid not found`, code: `NOT_FOUND`, statusCode: 400, details: { id: [`Invalid request parameters. User ID must be a positive integer.`] } }, { status: 400 })
    }
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })
    if (!user) {
      return NextResponse.json({ message: `User not found`, code: `NOT_FOUND`, statusCode: 404, }, { status: 404 })
    }
    await prisma.user.update({
      where:
        { id: Number(id) },
      data: {
        username: body.username,
        lastname: body.lastname,
        email: body.email,
        roleId: body.roleId,
        ...(body.password && {
          password: await argon2.hash(body.password)
        })  
      }
    })
    return NextResponse.json({ message: "Success Update" })
  }
  catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Sever Fail", code: `SERVER_ERROR`, statusCode: 500, }, { status: 500 })
  }
}
export async function DELETE(rquest: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })
    if (!user) {
      return NextResponse.json({ message: `User not found`, code: `NOT_FOUND`, statusCode: 404, }, { status: 404 })
    }
    await prisma.user.delete({
      where: { id: Number(id) }
    })
    return NextResponse.json({ message: "Delete Success" })
  }
  catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error", code: `SERVER_ERROR`, statusCode: 500, }, { status: 500 })
  }
}