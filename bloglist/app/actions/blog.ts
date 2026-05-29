'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addBlog, addLikes } from '../services/blogs'
import { auth } from '../auth'

export const createBlog = async (prevState: { error: string }, formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  const likes = parseInt(formData.get('likes') as string, 10) || 0

  if (!title || title.length < 5) {
    return { error: 'Title must be at least 5 characters long' }
  }
  if (!author || author.length < 5) {
    return { error: 'Author must be at least 5 characters long' }
  }
  if (!url || url.length < 5) {
    return { error: 'Url must be at least 5 characters long' }
  }

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
