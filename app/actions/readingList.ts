"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addToList, isInReadingList, getUserReadingList, markAsRead } from "../services/readingList"
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
  return await isInReadingList(blogId, userId)
}

export const getReadingListByUserId = async (userId: number) => {
  return await getUserReadingList(userId)
}

export const markRead = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = formData.get('blogId') as string

  await markAsRead(Number(blogId), user.id)

  revalidatePath(`/me`)
  redirect(`/me`)
}