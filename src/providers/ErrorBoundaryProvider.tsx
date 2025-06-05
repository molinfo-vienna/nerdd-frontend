import ErrorPage from "@/pages/ErrorPage"
import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"

type ErrorBoundaryProviderProps = {
    children: ReactNode
}

export default function ErrorBoundaryProvider({
    children,
}: ErrorBoundaryProviderProps) {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
    )
}
