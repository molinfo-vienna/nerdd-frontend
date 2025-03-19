import { lazy, Suspense } from "react";

type IconProps = {
    collection?: string;
    name: string;
    [key: string]: any;
}

const loadIcon = (collection: string, name: string) => {
    const handler = (module: Record<string, any>) => {
        if (module[name] === undefined) {
            throw new Error(`Unknown icon name: ${name}`)
        }
        return { default: module[name] }
    }

    switch (collection) {
        case "hi2":
            return import("react-icons/hi2").then(handler)
        case "fa":
            return import("react-icons/fa").then(handler)
        case "fa6":
            return import("react-icons/fa6").then(handler)
        case "bs":
            return import("react-icons/bs").then(handler)
        case "pi":
            return import("react-icons/pi").then(handler)
        default:
            return Promise.reject(
                new Error(`Unknown icon collection: ${collection}`),
            )
    }
}

const Icon = ({ collection = "fa6", name, ...props }: IconProps) => {
    const IconComponent = lazy(() => loadIcon(collection, name))

    return (
        <Suspense fallback={null}>
            <IconComponent {...props} />
        </Suspense>
    )
}

export default Icon
