import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(id)

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
    </div>
  )
}

export default BlogPage
