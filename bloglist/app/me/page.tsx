import { redirect } from "next/navigation"
import { auth } from "@/app/auth"
import { getUserByUsername } from "../services/users"
import { generateToken } from "../actions/users"

const MePage = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await getUserByUsername(session.user.email)

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p className="mb-2">Name: {user ? user.name : "N/A"}</p>
      <p className="mb-2">Username: {user ? user.username : "N/A"}</p>
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
