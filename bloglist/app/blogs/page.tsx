import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author} ({blog.likes} likes)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
