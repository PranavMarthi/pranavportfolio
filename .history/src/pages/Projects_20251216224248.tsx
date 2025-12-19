// src/pages/Projects.tsx
export function Projects() {
  return (
    <div id="projects" className="min-h-screen flex items-start justify-center pt-[calc(100vw/27*2)] pb-16">
      <div className="max-w-3xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Projects</h1>
        <div className="space-y-6">
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Project One</h2>
            <p className="text-gray-700 dark:text-gray-300">
              A cool project I built that does amazing things. It uses React, TypeScript, and some other cool tech.
            </p>
          </div>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Project Two</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Another awesome project that solves real problems. Built with modern web technologies.
            </p>
          </div>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Project Three</h2>
            <p className="text-gray-700 dark:text-gray-300">
              A side project that combines creativity and technical skills. Always learning something new.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

