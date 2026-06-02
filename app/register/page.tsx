'use client'

import { useActionState } from "react"
import { registerUser, UserFormState } from "../actions/users"

export default function RegisterPage() {
  const initialState: UserFormState = { errors: {}, values: { username: '', name: '', password: '', confirmPassword: '' } }
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction}>
        <div className="mb-4">
          <label className="block mb-2">
            Username
            <input type="text" name="username" defaultValue={state.values?.username} required className="w-full px-3 py-2 border rounded" />
          </label>
        </div>
        {state.errors && <p className="text-red-500" data-testid="username-error">{state.errors['username']}</p>}
        <div className="mb-4">
          <label className="block mb-2">
            Name
            <input type="text" name="name" defaultValue={state.values?.name} required className="w-full px-3 py-2 border rounded" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Password
            <input type="password" name="password" defaultValue={state.values?.password} required className="w-full px-3 py-2 border rounded" />
          </label>
        </div>
        {state.errors && <p className="text-red-500" data-testid="password-error">{state.errors['password']}</p>}
        <div className="mb-4">
          <label className="block mb-2">
            Confirm Password
            <input type="password" name="confirmPassword" required className="w-full px-3 py-2 border rounded" />
          </label>
        </div>
        {state.errors && <p className="text-red-500" data-testid="confirmPassword-error">{state.errors['confirmPassword']}</p>}
        <button type="submit" className="bg-blue-600 text-white w-full mt-8 px-4 py-2 rounded hover:bg-blue-700" data-testid="register-button">Register</button>
      </form>
    </div>
  )
}