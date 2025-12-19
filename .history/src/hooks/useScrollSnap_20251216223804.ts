// src/hooks/useScrollSnap.ts
import { useEffect, useRef } from 'react'

export function useScrollSnap() {
  const isScrollingRef = useRef(false)
  const lastWheelTimeRef = useRef(0)
  const currentSectionIndexRef = useRef(0)
  const scrollTimeoutRef = useRef<number | null>(null)
  const activeScrollAnimationRef = useRef<number | null>(null)
  const hasProcessedScrollRef = useRef(false)

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

    const executeScroll = (targetIndex: number, sections: ReturnType<typeof getSections>) => {
      const targetSection = sections[targetIndex]
      if (!targetSection) return
      
      // Update index immediately
      currentSectionIndexRef.current = targetIndex
      isScrollingRef.current = true
      hasProcessedScrollRef.current = true
      
      // Start scroll immediately
      window.scrollTo({
        top: targetSection.top,
        behavior: 'smooth'
      })
      
      // Track scroll completion
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false
        hasProcessedScrollRef.current = false
        scrollTimeoutRef.current = null
      }, 800)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const now = Date.now()
      
      // CRITICAL: If we've already processed a scroll in this gesture, block ALL subsequent wheel events
      if (hasProcessedScrollRef.current) {
        return
      }
      
      // Block if we're already scrolling
      if (isScrollingRef.current) {
        return
      }
      
      // VERY aggressive debounce - block if we just processed a scroll (1500ms)
      if (now - lastWheelTimeRef.current < 1500) {
        return
      }
      
      // Mark that we're processing this scroll gesture immediately
      hasProcessedScrollRef.current = true
      lastWheelTimeRef.current = now
      
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      
      const sections = getSections()
      if (sections.length === 0) {
        hasProcessedScrollRef.current = false
        return
      }
      
      // Always calculate current section from actual scroll position
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
      
      const currentIndex = actualCurrentIndex
      currentSectionIndexRef.current = currentIndex
      
      // Determine target index - always exactly one section away
      let targetIndex: number
      if (scrollDirection > 0) {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1)
      } else {
        targetIndex = Math.max(currentIndex - 1, 0)
      }

      // If already at target, ignore
      if (targetIndex === currentIndex) {
        hasProcessedScrollRef.current = false
        return
      }
      
      // Execute scroll immediately
      executeScroll(targetIndex, sections)
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (activeScrollAnimationRef.current !== null) {
        cancelAnimationFrame(activeScrollAnimationRef.current)
      }
    }
  }, [])
}

