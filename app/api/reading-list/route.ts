import { NextResponse } from "next/server"
import { addToList, isInReadingList } from "@/app/services/readingList"
import { getCurrentUser } from "@/app/services/session"

export const POST = async (request: Request) => {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const blogId = Number(body.blogId)

  if (!Number.isInteger(blogId) || blogId <= 0) {
    return NextResponse.json({ error: "Invalid blogId" }, { status: 400 })
  }

  const alreadyInList = await isInReadingList(blogId, user.id)
  if (!alreadyInList) {
    await addToList(blogId, user.id)
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
