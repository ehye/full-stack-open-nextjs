import { redirect } from "next/navigation"
import { auth } from "@/app/auth"
import { getUserByUsername } from "../services/users"
import { generateToken } from "../actions/users"
import { getReadingListByUserId, markRead } from '@/app/actions/readingList'
import Link from "next/link"

const MePage = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await getUserByUsername(session.user.email)
  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingListByUserId(user.id)

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p className="mb-2">Name: {user ? user.name : "N/A"}</p>
      <p className="mb-2">Username: {user ? user.username : "N/A"}</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Reading List</h3>
      <div>Unread ({readingList.filter(item => !item.read).length})</div>
      {readingList.filter(item => !item.read).length === 0 ? (
        <p className="mb-2 text-sm text-gray-500 italic">No unread blogs in your reading list</p>
      ) : (
        <ul className="list-disc list-inside mb-4">
          {readingList.filter(item => !item.read).map((item) => (
            <div key={item.id} className="mb-1">
              <form action={markRead}>
                <input type="hidden" name="blogId" value={item.blog.id} />
                <Link href={`/blogs/${item.blog.id}`} className="text-blue-600 hover:underline">
                  {item.blog.title}
                </Link>
                <button type="submit" className="bg-green-600 text-white ml-10 px-2 py-1 rounded hover:bg-green-700">
                  Mark as read
                </button>
              </form>
            </div>
          ))}
        </ul>
      )}
      <div>Read ({readingList.filter(item => item.read).length})</div>
      {readingList.filter(item => item.read).length === 0 ? (
        <p className="mb-2 text-sm text-gray-500 italic">No read blogs in your reading list</p>
      ) : (
        <ul className="list-disc list-inside mb-4">
          {readingList.filter(item => item.read).map((item) => (
            <li key={item.id} className="mb-1">
              <Link href={`/blogs/${item.blog.id}`} className="text-blue-600 hover:underline">
                {item.blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-xl font-semibold mt-4 mb-2">API Token</h3>
      <div>
        {user?.token ? (
          <>
            <p className="mb-2 text-sm">{"Current Token:"}</p>
            <p className="mb-2 text-sm">{user.token}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={generateToken}>Generate New Token</button>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm">No token has been generated yet</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={generateToken}>Generate Token</button>
          </>
        )}
      </div>
    </div>
  )
}

export default MePage
