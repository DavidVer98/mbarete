import { useEffect } from 'react'
import { BackHandler } from 'react-native'

/**
 * A custom hook to handle Android hardware back button presses
 * @param callback Function to call when back button is pressed
 * @param dependencies Array of dependencies to watch for changes
 */
export function useBackButton(callback: () => void, dependencies: React.DependencyList = []) {
  useEffect(() => {
    const backAction = () => {
      callback()
      return true // Prevents default behavior (exiting the app)
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    )

    return () => backHandler.remove() // Clean up when component unmounts
  }, [callback, ...dependencies])
}
