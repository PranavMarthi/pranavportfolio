// src/hooks/useScrollSnap.ts
import { useEffect, useRef } from 'react'

export function useScrollSnap() {
  const isScrollingRef = useRef(false)
  const lastWheelTimeRef = useRef(0)

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

    const getCurrentSectionIndex = (sections: ReturnType<typeof getSections>) => {
      const currentScroll = window.scrollY
      const viewportCenter = currentScroll + window.innerHeight / 2
      
      // Find which section's top is closest to our current scroll position
      let closestIndex = 0
      let minDistance = Infinity
      
      sections.forEach((section, index) => {
        const distance = Math.abs(section.top - currentScroll)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })
      
      return closestIndex
    }

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      
      // Prevent rapid-fire scrolls (debounce)
      if (now - lastWheelTimeRef.current < 100) {
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
      
      const currentIndex = getCurrentSectionIndex(sections)
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

      const targetSection = sections[targetIndex]
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.top,
          behavior: 'smooth'
        })
        
        // Reset flag after scroll animation completes
        setTimeout(() => {
          isScrollingRef.current = false
        }, 600)
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

