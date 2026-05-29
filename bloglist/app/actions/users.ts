"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { addUser, checkUsername } from "../services/users"

export type UserFormState = {
  errors: { [key: string]: string }
  values: {
    username: string
    name: string
    password: string
    confirmPassword: string
  }
}

export const registerUser = async (prevState: UserFormState, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const passwordHash = await bcrypt.hash(password, 10)

  const usernameExists = await checkUsername(username)

  const errors: { [key: string]: string } = {}
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }
  if (usernameExists) {
    errors.username = `Username ${username} is already taken`
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, confirmPassword } }
  }

  await addUser(username, name, passwordHash)

  redirect("/login")
}