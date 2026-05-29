'use client'

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog, type BlogFormState } from '@/app/actions/blog'
import { useNotification } from "@/app/components/NotificationContext"

const NewBlog = () => {
  const initialState: BlogFormState = { errors: {}, values: { title: '', author: '', url: '' }, success: false }
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            Title
            <input type="text" name="title" defaultValue={state.values?.title} required />
          </label>
        </div>
        {state.errors && <p className="text-red-600">{state.errors['title']}</p>}
        <div>
          <label className="flex items-center gap-2">
            Author
            <input type="text" name="author" defaultValue={state.values?.author} required />
          </label>
        </div>
        {state.errors && <p className="text-red-600">{state.errors['author']}</p>}
        <div>
          <label className="flex items-center gap-2">
            URL
            <input type="text" name="url" defaultValue={state.values?.url} required />
          </label>
        </div>
        {state.errors && <p className="text-red-600">{state.errors['url']}</p>}
        <div>
          <label className="flex items-center gap-2">
            Likes
            <input type="number" name="likes" />
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
