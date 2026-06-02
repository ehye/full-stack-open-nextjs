"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4" aria-label="Main navigation">
      <NavLink href="/">Home</NavLink>
      {" | "}
      <NavLink href="/blogs">Blogs</NavLink>
      {" | "}
      <NavLink href="/users">Users</NavLink>
      {" | "}
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href="/blogs/new">Create new</NavLink>
            {" | "}
            <NavLink href="/me">Me</NavLink>
            {" | "}
            <button onClick={() => signOut()} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm" data-testid="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            {" | "}
            <NavLink href="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}