import { redirect, notFound, unauthorized } from 'next/navigation'
import { auth } from "@/app/auth"
import { likeBlog } from '@/app/actions/blog'
import { isInUserReadingList, addToReadingList } from '@/app/actions/readingList'
import { getBlogById } from '@/app/services/blogs'
import { getUserByUsername, getBlogsByUserId } from '@/app/services/users'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getUserByUsername(session?.user?.email ?? '')
  if (!user) {
    unauthorized()
  }

  let isUserBlog = false
  const blogList = await getBlogsByUserId(user.id)
  blogList.forEach((b) => {
    if (b.id === blog.id) {
      isUserBlog = true
    }
  })

  const isInReadingList = await isInUserReadingList(blog.id, user.id)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className={"mb-4 text-gray-500"}>By {blog.author}</p>
      <p className={"mb-4 text-gray-500"}>Link: {blog.url}</p>
      <p className={"mb-4 text-gray-500"}>{blog.likes} Likes</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Like</button>
      </form>
      <form action={addToReadingList}>
        <input type="hidden" name="blogId" value={blog.id} />
        {isUserBlog || isInReadingList ? (
          <button disabled className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">In reading list</button>
        ) : (
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to reading list</button>
        )}
      </form>
    </div>
  )
}

export default BlogPage
