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
      // Cancel any existing scroll animation
      if (activeScrollAnimationRef.current !== null) {
        cancelAnimationFrame(activeScrollAnimationRef.current)
        activeScrollAnimationRef.current = null
      }
      
      // Clear pending scrolls
      pendingScrollRef.current = null
      
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
      
      // Track scroll completion with a shorter timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false
        scrollTimeoutRef.current = null
      }, 600)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const now = Date.now()
      const scrollDirection = e.deltaY > 0 ? 1 : -1
      
      // Very short debounce - only prevent rapid-fire events (50ms)
      if (now - lastWheelTimeRef.current < 50) {
        return
      }
      
      lastWheelTimeRef.current = now
      
      const sections = getSections()
      if (sections.length === 0) {
        return
      }
      
      // Get current section - use the ref if we're mid-scroll, otherwise calculate
      let currentIndex: number
      if (isScrollingRef.current && currentSectionIndexRef.current !== null) {
        // If we're scrolling, use the target index we're going to
        currentIndex = currentSectionIndexRef.current
      } else {
        // Calculate from actual scroll position
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
        currentIndex = actualCurrentIndex
        currentSectionIndexRef.current = currentIndex
      }
      
      // Determine target index
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
      
      // If we have a pending scroll in the same direction, update it
      if (pendingScrollRef.current) {
        const pendingDirection = pendingScrollRef.current.targetIndex > currentIndex ? 1 : -1
        if (pendingDirection === scrollDirection) {
          // Same direction - update to latest target
          pendingScrollRef.current = { targetIndex, timestamp: now }
          return
        } else {
          // Opposite direction - cancel pending and execute immediately
          pendingScrollRef.current = null
          executeScroll(targetIndex, sections)
          return
        }
      }
      
      // If we're currently scrolling, queue this scroll
      if (isScrollingRef.current) {
        pendingScrollRef.current = { targetIndex, timestamp: now }
        // Execute after a short delay to allow current scroll to start
        setTimeout(() => {
          if (pendingScrollRef.current && pendingScrollRef.current.targetIndex === targetIndex) {
            executeScroll(targetIndex, sections)
          }
        }, 100)
        return
      }
      
      // No active scroll - execute immediately
      executeScroll(targetIndex, sections)
    }
    
    // Process pending scrolls when current scroll completes
    const checkPendingScroll = () => {
      if (pendingScrollRef.current && !isScrollingRef.current) {
        const sections = getSections()
        executeScroll(pendingScrollRef.current.targetIndex, sections)
      }
    }
    
    // Check for pending scrolls periodically
    const pendingCheckInterval = setInterval(checkPendingScroll, 100)

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions)
      clearInterval(pendingCheckInterval)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (activeScrollAnimationRef.current !== null) {
        cancelAnimationFrame(activeScrollAnimationRef.current)
      }
    }
  }, [])
}

