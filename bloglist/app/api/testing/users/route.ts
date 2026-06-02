import { NextResponse } from "next/server"
import { addUser } from "@/app/services/users"
import bcrypt from "bcryptjs"

export const POST = async (request: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await request.json()
  const username = body.username?.trim()
  const name = body.name?.trim()
  const password = body.password
  const passwordHash = await bcrypt.hash(password, 10)
  await addUser(username, name, passwordHash)
  return NextResponse.json({ message: "User created successfully" }, { status: 201 })
}