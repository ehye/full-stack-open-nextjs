'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addLikes } from '../services/blogs'
import { auth } from '../auth'

export const createBlog = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const likes = parseInt(formData.get('likes') as string, 10) || 0
  await addBlog(title, author, url, likes)

  revalidatePath('/blogs')
  redirect('/blogs')
}

export const likeBlog = async (formData: FormData) => {
  const id = formData.get('id') as string
  await addLikes(Number(id))

  revalidatePath(`/blogs/${id}`)
  redirect(`/blogs/${id}`)
}
