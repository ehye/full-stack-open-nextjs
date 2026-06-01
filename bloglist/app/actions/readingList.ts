"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addToList, isInReadingList } from "../services/readingList"
import { getCurrentUser } from "../services/session"

export const addToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = formData.get('blogId') as string
  const userId = user.id
  await addToList(Number(blogId), userId)

  revalidatePath(`/blogs/${blogId}`)
  redirect(`/blogs/${blogId}`)
}

export const isInUserReadingList = async (blogId: number, userId: number) => {
  return  await isInReadingList(blogId, userId)
}