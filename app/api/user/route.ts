import { prisma } from "@/lib/prima";
import { NextRequest, NextResponse } from "next/server";
import * as argon2 from "argon2";
import { Prisma } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const roleId = searchParams.get("roleId");
    const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

    const whereCondition = roleId ?{
      roleId:Number(roleId),
      username:{
        contains:search,
      },
    }
    :{
      username:{
        contains:search,
      },
    }
    
    const users = await prisma.user.findMany({
      where: whereCondition,
      orderBy: {
        id: sort,
      },
      select: {
        id: true,
        username: true,
        lastname: true,
        email: true,
        roleId: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Server Error", code: `SERVER_ERROR`, statusCode: 500 },
      { status: 500 },
    );
  }
}
interface CreateUserBody{
  username:string;
  lastname:string;
  password:string;
  email:string;
  roleId:number;
}
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateUserBody;
    const hashPassword = await argon2.hash(body.password);
    const add = await prisma.user.create({
      data: {
        username: body.username,
        lastname: body.lastname,
        password: hashPassword, 
        email: body.email,
        roleId: body.roleId,
      },
    });

    return NextResponse.json({ message: "Post Success", add }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Server Fail", code: `SERVER_ERROR`, statusCode: 500 },
      { status: 500 },
    );
  }
}
