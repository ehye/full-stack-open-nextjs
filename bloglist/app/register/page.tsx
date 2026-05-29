'use client'

import { useActionState } from "react"
import { registerUser, UserFormState } from "../actions/users"

export default function RegisterPage() {
  const initialState: UserFormState = { errors: {}, values: { username: '', name: '', password: '', confirmPassword: '' } }
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" defaultValue={state.values?.username} required />
          </label>
        </div>
        {state.errors && <p style={{ color: "red" }}>{state.errors['username']}</p>}
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values?.name} required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" defaultValue={state.values?.password} required />
          </label>
        </div>
        {state.errors && <p style={{ color: "red" }}>{state.errors['password']}</p>}
        <div>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" required />
          </label>
        </div>
        {state.errors && <p style={{ color: "red" }}>{state.errors['confirmPassword']}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}