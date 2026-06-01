import { NextResponse } from "next/server"
import { getUserByToken, getUserWithBlogs } from "@/app/services/users"

export const GET = async (request: Request) => {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const token = authHeader.slice("Bearer ".length)

  const user = await getUserByToken(token)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const blogs = await getUserWithBlogs(user.username)
  return NextResponse.json(blogs)
}