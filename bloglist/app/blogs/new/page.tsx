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
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" defaultValue={state.values?.title} required />
          </label>
        </div>
        {state.errors && <p style={{ color: "red" }}>{state.errors['title']}</p>}
        <div>
          <label>
            Author
            <input type="text" name="author" defaultValue={state.values?.author} required />
          </label>
        </div>
        {state.errors && <p style={{ color: "red" }}>{state.errors['author']}</p>}
        <div>
          <label>
            URL
            <input type="text" name="url" defaultValue={state.values?.url} required />
          </label>
        </div>
        {state.errors && <p style={{ color: "red" }}>{state.errors['url']}</p>}
        <div>
          <label>
            Likes
            <input type="number" name="likes" />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
