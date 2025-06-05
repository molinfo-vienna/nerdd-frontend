import { ComponentType, PropsWithChildren, ReactNode } from "react"
import AppRouterProvider from "./AppRouterProvider"
import DebugProvider from "./DebugProvider"
import ErrorBoundaryProvider from "./ErrorBoundaryProvider"
import ReduxProvider from "./ReduxProvider"
import SuspenseProvider from "./SuspenseProvider"

type PropsWithRequiredChildren<P = unknown> = P & { children: ReactNode }

type Provider = ComponentType<PropsWithRequiredChildren>

const providers: Provider[] = [
    ReduxProvider,
    AppRouterProvider,
    ErrorBoundaryProvider,
    SuspenseProvider,
    DebugProvider,
]

export default function Providers({ children }: PropsWithChildren) {
    const Provider = providers.reduceRight(
        (Prev, Curr) =>
            ({ children }: PropsWithChildren) => (
                <Curr>
                    <Prev>{children}</Prev>
                </Curr>
            ),
        ({ children }: PropsWithChildren) => <>{children}</>,
    )

    return <Provider>{children}</Provider>
}
