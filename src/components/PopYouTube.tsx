"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface YouTubePopupProps {
  videoId: string
  delayInSeconds?: number
  minWatchTimeInSeconds?: number
}

export function YouTubePopup({
  videoId = "4uZuBemLfkE", // Your YouTube shorts video ID
  delayInSeconds = 10,
  minWatchTimeInSeconds = 10,
}: YouTubePopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeWatched, setTimeWatched] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we can close the popup (after minimum watch time)
  const canClose = timeWatched >= minWatchTimeInSeconds

  useEffect(() => {
    // Check if we're on mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    // Show popup after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, delayInSeconds * 1000)

    return () => {
      clearTimeout(showTimer)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [delayInSeconds])

  // Start counting watch time once popup is visible
  useEffect(() => {
    if (!isVisible) return

    const watchTimer = setInterval(() => {
      setTimeWatched((prev) => {
        if (prev < minWatchTimeInSeconds) {
          return prev + 1
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(watchTimer)
  }, [isVisible, minWatchTimeInSeconds])

  // Close the popup
  const handleClose = () => {
    if (canClose) {
      setIsVisible(false)
    }
  }

  if (!isVisible) return null

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&controls=0&rel=0&showinfo=0&modestbranding=1`

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity ${
        isMobile ? "p-0" : "p-8"
      }`}
    >
      <div
        className={`relative bg-black overflow-hidden ${
          isMobile ? "w-full h-full" : "w-[350px] rounded-xl shadow-2xl"
        }`}
      >
        {/* Top bar with timer and close icon */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 to-transparent">
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {timeWatched}
          </div>

          <button
            className={`rounded-full bg-black/50 backdrop-blur-sm text-white p-1 ${
              canClose ? "hover:bg-red-900/70" : "opacity-50 cursor-not-allowed"
            }`} 
            onClick={handleClose} 
            disabled={!canClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* YouTube video */}
        <div className={`${
          isMobile ? "w-full h-full" : "w-full"
        } aspect-[9/16]`}
        >
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Message when can't close yet */}
        {!canClose && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Please wait {minWatchTimeInSeconds - timeWatched}s to close
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
