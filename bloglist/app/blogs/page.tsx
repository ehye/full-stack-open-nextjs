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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
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
      <ul className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
              {blog.title} by {blog.author}
              <strong className="ml-2 text-amber-600"> ({blog.likes} likes)</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
