import { NextResponse } from "next/server"
import { deleteAllUsers } from "@/app/services/users"
import { deleteAllBlogs } from "@/app/services/blogs"
import { deleteAllFromReadingList } from "@/app/services/readingList"

export const DELETE = async (request: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await request.json()
  await deleteAllUsers()
  await deleteAllBlogs()
  await deleteAllFromReadingList()

  return NextResponse.json({ message: "Database reset successfully" })
}