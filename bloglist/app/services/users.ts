import { eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs, users } from "@/db/schema"

const userColumnsWithoutPasswordHash = {
  passwordHash: false,
} as const

export const getUsers = async () => {
  return db.query.users.findMany({
    columns: userColumnsWithoutPasswordHash,
  })
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    columns: userColumnsWithoutPasswordHash,
  })
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    columns: userColumnsWithoutPasswordHash,
  })
}

export const getBlogsByUserId = async (userId: number) => {
  return db.query.blogs.findMany({
    where: eq(blogs.userId, userId),
  })
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    columns: userColumnsWithoutPasswordHash,
    with: { blogs: true },
  })
}

export const addUser = async (username: string, name: string, passwordHash: string) => {
  await db.insert(users).values({ username, name, passwordHash })
}

export const checkUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: { id: true },
  })
  return !!user
}

export const generateTokenForUser = async (username: string, token: string) => {
  await db.update(users).set({ token }).where(eq(users.username, username))
}

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: userColumnsWithoutPasswordHash,
  })
}
