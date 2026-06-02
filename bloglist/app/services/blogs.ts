import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async (title?: string) => {
  const filteredBlogs = title
    ? await db.query.blogs.findMany({ where: eq(blogs.title, title) })
    : await db.select().from(blogs)
  return filteredBlogs.toSorted((a, b) => b.likes - a.likes)
}

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const user = await getCurrentUser()
  await db.insert(blogs).values({ title, author, url, likes, userId: user?.id ?? 0 })
}

export const getBlogById = async (id: number) => db.query.blogs.findFirst({ where: eq(blogs.id, id) })

export const addLikes = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id))
  }
}

export const deleteAllBlogs = async () => {
  await db.delete(blogs)
}