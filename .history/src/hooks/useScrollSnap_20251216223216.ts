// src/hooks/useScrollSnap.ts
import { useEffect, useRef } from 'react'

export function useScrollSnap() {
  const isScrollingRef = useRef(false)
  const lastWheelTimeRef = useRef(0)
  const currentSectionIndexRef = useRef(0)
  const scrollTimeoutRef = useRef<number | null>(null)
  const wheelGestureTimeoutRef = useRef<number | null>(null)
  const hasProcessedWheelRef = useRef(false)

  useEffect(() => {
    const getSections = () => {
      return Array.from(document.querySelectorAll('[id="about"], [id="projects"], [id="random"]'))
        .map(section => {
          const rect = section.getBoundingClientRect()
          return {
            element: section,
            top: rect.top + window.scrollY,
            id: section.id
          }
        })
        .sort((a, b) => a.top - b.top)
    }

    // Initialize current section on mount
    const initSections = getSections()
    if (initSections.length > 0) {
      const currentScroll = window.scrollY
      let closestIndex = 0
      let minDistance = Infinity
      
      initSections.forEach((section, index) => {
        const distance = Math.abs(section.top - currentScroll)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })
      
      currentSectionIndexRef.current = closestIndex
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const now = Date.now()
      
      // If we've already processed a wheel event in this gesture, ignore subsequent ones
      if (hasProcessedWheelRef.current) {
        return
      }
      
      // Block if we're already scrolling
      if (isScrollingRef.current) {
        return
      }
      
      // Block if we just handled a scroll (debounce)
      if (now - lastWheelTimeRef.current < 1200) {
        return
      }
      
      // Clear any pending timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }
      if (wheelGestureTimeoutRef.current) {
        clearTimeout(wheelGestureTimeoutRef.current)
        wheelGestureTimeoutRef.current = null
      }
      
      // Mark that we've processed this wheel gesture
      hasProcessedWheelRef.current = true
      isScrollingRef.current = true
      lastWheelTimeRef.current = now
      
      // Reset the processed flag after a delay to allow new gestures
      wheelGestureTimeoutRef.current = window.setTimeout(() => {
        hasProcessedWheelRef.current = false
        wheelGestureTimeoutRef.current = null
      }, 1500)
      
      const sections = getSections()
      if (sections.length === 0) {
        isScrollingRef.current = false
        hasProcessedWheelRef.current = false
        return
      }
      
      // Get current section based on actual scroll position
      const currentScroll = window.scrollY
      let actualCurrentIndex = 0
      let minDistance = Infinity
      
      sections.forEach((section, index) => {
        const distance = Math.abs(section.top - currentScroll)
        if (distance < minDistance) {
          minDistance = distance
          actualCurrentIndex = index
        }
      })
      
      // Use the actual current index
      currentSectionIndexRef.current = actualCurrentIndex
      const currentIndex = actualCurrentIndex
      
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      
      let targetIndex: number

      if (scrollDirection > 0) {
        // Scrolling down - go to next section
        targetIndex = Math.min(currentIndex + 1, sections.length - 1)
      } else {
        // Scrolling up - go to previous section
        targetIndex = Math.max(currentIndex - 1, 0)
      }

      // Only scroll if we're actually changing sections
      if (targetIndex === currentIndex) {
        isScrollingRef.current = false
        hasProcessedWheelRef.current = false
        return
      }

      // Update the current section index immediately BEFORE scrolling
      currentSectionIndexRef.current = targetIndex

      const targetSection = sections[targetIndex]
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.top,
          behavior: 'smooth'
        })
        
        // Reset flags after scroll animation completes
        scrollTimeoutRef.current = window.setTimeout(() => {
          isScrollingRef.current = false
          scrollTimeoutRef.current = null
        }, 1200)
      } else {
        isScrollingRef.current = false
        hasProcessedWheelRef.current = false
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (wheelGestureTimeoutRef.current) {
        clearTimeout(wheelGestureTimeoutRef.current)
      }
    }
  }, [])
}

