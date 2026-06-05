import { lazy, Suspense, type ComponentType } from "react"
import { CustomSpinner } from "../spinner"

//high order component
export const LazyPage = <T extends Record<string, ComponentType<any>>>(
  importer: () => Promise<T>,
  componentName: keyof T,
) => {
  const LazyComponent = lazy(() =>
    importer().then((module) => ({
      default: module[componentName] as ComponentType<any>,
    })),
  )

  return () => (
    <Suspense fallback={<CustomSpinner />}>
      <LazyComponent />
    </Suspense>
  )
}
