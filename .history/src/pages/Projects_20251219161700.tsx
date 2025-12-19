// src/pages/Projects.tsx
import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { X } from 'lucide-react'

interface Project {
  id: string
  image: string
  alt: string
  title: string
  description: string
}

const projects: Project[] = [
  {
    id: '1',
    image: '/images/attached_image.png',
    alt: 'Project showcase',
    title: 'do-eve',
    description: 'do everything imessage agent that allows you to control your laptop with your phone'
  },
  {
    id: '2',
    image: '/images/gallery.jpg',
    alt: 'Gallery',
    title: 'vibetype',
    description: 'autocomplete your typing, improving, rewriting, and even generating text'
  },
  {
    id: '3',
    image: '/images/guidebot.png',
    alt: 'Guidebot',
    title: 'guidebot',
    description: 'An autonomous robot project featuring advanced sensors and camera modules to get people where they need to go'
  },
  {
    id: '4',
    image: '/images/Gemini_Generated_Image_hiqrr0hiqrr0hiqr.png',
    alt: 'Gemini Generated Image',
    title: 'piano tiles',
    description: 'built piano tiles in pygame'
  }
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [closing, setClosing] = useState(false)
  const closeTimer = useRef<number | null>(null)

  const openModal = (project: Project) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setClosing(false)
    setSelectedProject(project)
  }

  const closeModal = () => {
    if (closing || !selectedProject) return
    setClosing(true)
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
    }
    closeTimer.current = window.setTimeout(() => {
      setSelectedProject(null)
      setClosing(false)
      closeTimer.current = null
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
      }
    }
  }, [])

  return (
    <>
      <div id="projects" className="h-screen flex items-center justify-center scroll-mt-0 pt-0 pb-20 md:pb-0 -mt-4 md:-mt-6">
        <div className="max-w-3xl mx-auto px-4 md:px-6 pt-0 md:pt-2 pb-8 md:pb-12 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">Projects</h1>
          <div className="mb-8 flex flex-col md:flex-row justify-between gap-2 md:gap-1">
            <div className="w-full md:w-[49.5%] flex flex-col gap-2 md:gap-1">
              {projects.filter(p => p.id === '1' || p.id === '4').map((project) => (
                <div
                  key={project.id}
                  className="relative group cursor-pointer w-full rounded-lg overflow-hidden"
                  onClick={() => openModal(project)}
                >
                  <div className="w-full h-48 md:h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={project.image} 
                      alt={project.alt} 
                      className={cn(
                        "w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105",
                        project.id === '4' ? "object-contain" : "object-cover"
                      )}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-lg flex items-center justify-center pointer-events-none">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 md:px-6 py-2 md:py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto text-sm md:text-base">
                      See details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-[49.5%] flex flex-col gap-2 md:gap-1">
              {projects.filter(p => p.id === '2' || p.id === '3').map((project) => (
                <div
                  key={project.id}
                  className="relative group cursor-pointer w-full rounded-lg overflow-hidden"
                  onClick={() => openModal(project)}
                >
                  <div className="w-full h-48 md:h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <img 
                      src={project.image} 
                      alt={project.alt} 
                      className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-lg flex items-center justify-center pointer-events-none">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 md:px-6 py-2 md:py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto text-sm md:text-base">
                      See details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            closing ? "animate-out fade-out duration-300" : "animate-in fade-in duration-300"
          )}
          onClick={closeModal}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/50 backdrop-blur-sm",
              closing ? "animate-out fade-out duration-300" : "animate-in fade-in duration-300"
            )}
          />
          <div
            className={cn(
              "relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full mx-4 md:mx-0 max-h-[90vh] overflow-y-auto",
              closing ? "animate-out fade-out zoom-out-95 duration-300" : "animate-in fade-in zoom-in-95 duration-300",
              "border border-gray-200 dark:border-gray-800"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className={cn(
                "absolute top-4 right-4 p-2 rounded-full",
                "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "transition-colors duration-200"
              )}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 md:p-8">
              <img
                src={selectedProject.image}
                alt={selectedProject.alt}
                className="w-full h-auto rounded-lg mb-4 md:mb-6 object-cover"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

