import createRouter from "@/app/router"
import { RouterProvider } from "react-router-dom"

type AppRouterProviderProps = {
    children: React.ReactNode
}

export default function AppRouterProvider({
    children,
}: AppRouterProviderProps) {
    const router = createRouter(children)

    return <RouterProvider router={router} />
}
