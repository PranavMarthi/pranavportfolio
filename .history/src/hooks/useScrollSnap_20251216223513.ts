// src/hooks/useScrollSnap.ts
import { useEffect, useRef } from 'react'

export function useScrollSnap() {
  const isScrollingRef = useRef(false)
  const lastWheelTimeRef = useRef(0)
  const currentSectionIndexRef = useRef(0)
  const scrollTimeoutRef = useRef<number | null>(null)
  const activeScrollAnimationRef = useRef<number | null>(null)
  const pendingScrollRef = useRef<{ targetIndex: number; timestamp: number } | null>(null)

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
        scrollTimeoutRef.current = null
      }, 500)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const now = Date.now()
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      
      // Short debounce to prevent rapid-fire but allow quick response
      if (now - lastWheelTimeRef.current < 200) {
        return
      }
      
      // If we're scrolling, only allow opposite direction to cancel
      if (isScrollingRef.current) {
        // Check if this is opposite direction - if so, cancel and scroll
        const sections = getSections()
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
        
        const currentDirection = currentSectionIndexRef.current > actualCurrentIndex ? 1 : -1
        if (currentDirection !== scrollDirection) {
          // Opposite direction - cancel current scroll and start new one
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
            scrollTimeoutRef.current = null
          }
          isScrollingRef.current = false
          // Continue to execute scroll below
        } else {
          // Same direction - ignore to prevent skipping
          return
        }
      }
      
      lastWheelTimeRef.current = now
      
      const sections = getSections()
      if (sections.length === 0) {
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

