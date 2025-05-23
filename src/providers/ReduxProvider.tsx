import { store } from "@/app/store"
import { ReactNode } from "react"
import { Provider } from "react-redux"

type ReduxProviderProps = {
    children: ReactNode
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return <Provider store={store}>{children}</Provider>
}
