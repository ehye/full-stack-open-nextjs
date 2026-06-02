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
      <h2 className="text-2xl font-bold mb-4" data-testid="user-profile">My Profile</h2>
      <p className="mb-2" data-testid="user-name">Name: {user ? user.name : "N/A"}</p>
      <p className="mb-2" data-testid="user-username">Username: {user ? user.username : "N/A"}</p>

      <h3 className="text-xl font-semibold mt-4 mb-2" data-testid="reading-list-section">Reading List</h3>
      <div>Unread ({readingList.filter(item => !item.read).length})</div>
      {readingList.length === 0 && (
        <p className="mb-2 text-sm text-gray-500 italic" data-testid="empty-reading-list">No blogs in your reading list</p>
      )}
      <div data-testid="unread-section">
        {readingList.filter(item => !item.read).length === 0 ? (
          <p className="mb-2 text-sm text-gray-500 italic" data-testid="no-unread-blogs">No unread blogs in your reading list</p>
        ) : (
          <ul className="list-disc list-inside mb-4">
            {readingList.filter(item => !item.read).map((item) => (
              <div key={item.id} className="mb-1">
                <form action={markRead}>
                  <input type="hidden" name="blogId" value={item.blog.id} />
                  <Link href={`/blogs/${item.blog.id}`} className="text-blue-600 hover:underline">
                    {item.blog.title}
                  </Link>
                  <button type="submit" className="bg-green-600 text-white ml-10 px-2 py-1 rounded hover:bg-green-700" data-testid={`mark-read-${item.blog.id}`}>
                    Mark as read
                  </button>
                </form>
              </div>
            ))}
          </ul>
        )}
      </div>
      <div>Read ({readingList.filter(item => item.read).length})</div>
      {readingList.filter(item => item.read).length === 0 ? (
        <p className="mb-2 text-sm text-gray-500 italic" data-testid="no-read-blogs">No read blogs in your reading list</p>
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
      <div data-testid="api-token-section">
        {user?.token ? (
          <>
            <p className="mb-2 text-sm" data-testid="token-display">{"Current Token:"}</p>
            <code className="mb-2 text-sm" data-testid="api-token">{user.token}</code>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={generateToken} data-testid="generate-token-button">Generate New Token</button>
          </>
        ) : (
          <>
            <p className="mb-2 text-sm" data-testid="no-token-message">No token has been generated yet</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={generateToken} data-testid="generate-token-button">Generate Token</button>
          </>
        )}
      </div>
    </div>
  )
}

export default MePage
