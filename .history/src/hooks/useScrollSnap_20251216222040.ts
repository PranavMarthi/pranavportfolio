// src/hooks/useScrollSnap.ts
import { useEffect, useRef } from 'react'

export function useScrollSnap() {
  const isScrollingRef = useRef(false)
  const lastWheelTimeRef = useRef(0)
  const currentSectionIndexRef = useRef(0)

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
    const sections = getSections()
    if (sections.length > 0) {
      const currentScroll = window.scrollY
      let closestIndex = 0
      let minDistance = Infinity
      
      sections.forEach((section, index) => {
        const distance = Math.abs(section.top - currentScroll)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })
      
      currentSectionIndexRef.current = closestIndex
    }

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      
      // Prevent rapid-fire scrolls (debounce)
      if (now - lastWheelTimeRef.current < 300) {
        e.preventDefault()
        return
      }
      
      if (isScrollingRef.current) {
        e.preventDefault()
        return
      }
      
      e.preventDefault()
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

      // Update the current section index immediately
      currentSectionIndexRef.current = targetIndex

      const targetSection = sections[targetIndex]
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.top,
          behavior: 'smooth'
        })
        
        // Reset flag after scroll animation completes
        setTimeout(() => {
          isScrollingRef.current = false
        }, 800)
      } else {
        isScrollingRef.current = false
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])
}

