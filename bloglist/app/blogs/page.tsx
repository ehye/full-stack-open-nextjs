import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const { title } = await searchParams
  const blogs = await getBlogs(title)
  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs" method="get">
        <input
          type="text"
          name="title"
          placeholder="Search by title..."
          defaultValue={title ?? ''}
        />
        <button type="submit">Search</button>
      </form>
      {title && <p>Search results for &quot;{title}&quot;</p>}
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
