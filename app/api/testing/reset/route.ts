import { NextResponse } from "next/server"
import { deleteAllUsers } from "@/app/services/users"
import { deleteAllBlogs } from "@/app/services/blogs"
import { deleteAllFromReadingList } from "@/app/services/readingList"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    // Respect FK dependencies: reading_list -> blogs -> users.
    await deleteAllFromReadingList()
    await deleteAllBlogs()
    await deleteAllUsers()
  } catch (error) {
    console.error("Failed to reset database", error)
    return NextResponse.json({ error: "Failed to reset database" }, { status: 500 })
  }

  return NextResponse.json({ message: "Database reset successfully" })
}