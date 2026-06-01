import { db } from "../../db"
import { readingList } from "../../db/schema"
import { eq, and } from "drizzle-orm"

export const addToList = async (blogId: number, userId: number) => {
  await db.insert(readingList).values({ blogId, userId })
}

export const isInReadingList = async (blogId: number, userId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: (rl, { eq, and }) => and(eq(rl.blogId, blogId), eq(rl.userId, userId)),
  })
  return !!entry
}

export const getUserReadingList = async (userId: number) => {
  const list = await db.query.readingList.findMany({
    where: (rl, { eq }) => eq(rl.userId, userId),
    with: {
      blog: true,
    },
  })
  return list
}

export const markAsRead = async (blogId: number, userId: number) => {
  await db.update(readingList).set({ read: true })
    .where(and(eq(readingList.blogId, blogId), eq(readingList.userId, userId)))
}