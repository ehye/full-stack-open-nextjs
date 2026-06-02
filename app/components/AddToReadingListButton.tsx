"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

type AddToReadingListButtonProps = {
  blogId: number
  disabled: boolean
}

export default function AddToReadingListButton({
  blogId,
  disabled,
}: AddToReadingListButtonProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAdded, setIsAdded] = useState(disabled)

  const handleClick = async () => {
    if (isSubmitting || isAdded) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reading-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId }),
      })

      if (!response.ok) {
        throw new Error("Failed to add blog to reading list")
      }

      setIsAdded(true)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const buttonDisabled = isSubmitting || isAdded

  return (
    <button
      type="button"
      disabled={buttonDisabled}
      onClick={handleClick}
      className={
        buttonDisabled
          ? "bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          : "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      }
      data-testid="add-to-reading-list-button"
    >
      {isAdded ? "In reading list" : "Add to reading list"}
    </button>
  )
}
