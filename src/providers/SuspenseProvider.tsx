import LoadingPage from "@/pages/LoadingPage"
import { ReactNode, Suspense } from "react"

type SuspenseProviderProps = {
    children: ReactNode
}

export default function SuspenseProvider({ children }: SuspenseProviderProps) {
    return <Suspense fallback={<LoadingPage />}>{children}</Suspense>
}
