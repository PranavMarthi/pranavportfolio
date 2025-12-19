// src/hooks/useScrollSnap.ts
import { useEffect, useRef } from 'react'

export function useScrollSnap() {
  const isScrollingRef = useRef(false)
  const lastWheelTimeRef = useRef(0)
  const currentSectionIndexRef = useRef(0)
  const scrollTimeoutRef = useRef<number | null>(null)
  const scrollEndTimeoutRef = useRef<number | null>(null)

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
      
      // Block if we're already scrolling
      if (isScrollingRef.current) {
        return
      }
      
      // Block if we just handled a scroll (debounce)
      if (now - lastWheelTimeRef.current < 300) {
        return
      }
      
      // Clear any pending timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }
      
      isScrollingRef.current = true
      lastWheelTimeRef.current = now
      
      const sections = getSections()
      if (sections.length === 0) {
        isScrollingRef.current = false
        return
      }
      
      const currentIndex = currentSectionIndexRef.current
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
        
        // Reset flag after scroll animation completes
        scrollTimeoutRef.current = window.setTimeout(() => {
          isScrollingRef.current = false
          scrollTimeoutRef.current = null
        }, 600)
      } else {
        isScrollingRef.current = false
      }
    }
    
    // Also listen for scroll end to reset the flag
    const handleScroll = () => {
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current)
      }
      scrollEndTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false
        scrollEndTimeoutRef.current = null
      }, 150)
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions)
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (scrollEndTimeout) {
        clearTimeout(scrollEndTimeout)
      }
    }
  }, [])
}

