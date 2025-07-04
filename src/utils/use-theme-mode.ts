import { useEffect, useState } from 'react'

/**
 * Custom hook to get and monitor theme mode from HTML tag class
 * @returns {string} Current theme mode ('light', 'dark')
 */
function useThemeMode(): 'dark' | 'light' {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const element = document.querySelector('html')

    if (!element) {
      console.warn(`Element with selector "${'html'}" not found`)
      return
    }

    // Function to determine current mode
    const getCurrentMode = () => {
      const classList = element.classList

      if (classList.contains('light')) {
        return 'light'
      } else if (classList.contains('dark')) {
        return 'dark'
      } else {
        return 'dark'
      }
    }

    // Set initial mode
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMode(getCurrentMode())

    // Create observer to watch for class changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          setMode(getCurrentMode())
        }
      })
    })

    // Start observing
    observer.observe(element, {
      attributeFilter: ['class'],
      attributes: true,
    })

    // Cleanup observer on unmount
    return () => {
      observer.disconnect()
    }
  }, [])

  return mode
}

export { useThemeMode }
