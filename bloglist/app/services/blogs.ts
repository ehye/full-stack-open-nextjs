import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

let nextId = 7

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
  await db.insert(blogs).values({ title, author, url, likes })
}

export const getBlogById = async (id: number) => db.query.blogs.findFirst({ where: eq(blogs.id, id) })

export const addLikes = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id))
  }
}
