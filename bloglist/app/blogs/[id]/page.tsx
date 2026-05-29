import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'
import { likeBlog } from '@/app/actions/blog'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className={"mb-4 text-gray-500"}>{blog.author}</p>
      <p className={"mb-4 text-gray-500"}>{blog.url}</p>
      <p className={"mb-4 text-gray-500"}>{blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Like</button>
      </form>
    </div>
  )
}

export default BlogPage
