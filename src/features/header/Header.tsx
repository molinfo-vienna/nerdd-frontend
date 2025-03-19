import { type Module } from "@/types"
import { Children, type ReactNode } from "react"
import { Link } from "react-router-dom"
import NavigationBar from "../navigationBar/NavigationBar"
import "./style.scss"

type HeaderProps = {
    module: Module;
    children?: ReactNode;
}

type HeaderContentProps = {
    children?: ReactNode;
}

type HeaderCardProps = {
    href?: string;
    children?: ReactNode;
    className?: string;
    [key: string]: any;
}

export default function Header({ module, children }: HeaderProps) {
    // get child having the pseudo type "Content"
    const content = Children.toArray(children).find(
        (child: any) => child.type?.name === "HeaderContent",
    )

    const cards = Children.toArray(children).filter(
        (child: any) => child.type?.name === "HeaderCard",
    )

    return (
        <header className="bg-body-tertiary">
            <NavigationBar />
            <section className="container py-5">
                <div className="row justify-content-center pb-3">
                    <div className="col-sm-6">
                        <h1 className="pb-3">
                            <span className="text-primary fw-bold">
                                {module.visibleName}:{" "}
                            </span>
                            {module.title}
                        </h1>
                        {content}
                    </div>
                    <div className="col-sm-4 d-flex flex-wrap align-content-center justify-content-center">
                        {cards}
                    </div>
                </div>
            </section>
        </header>
    )
}

Header.Content = function HeaderContent({ children }: HeaderContentProps) {
    return <>{children}</>
}

Header.Card = function HeaderCard({ href, children, className, ...props }: HeaderCardProps) {
    // merge props with default values
    const mergedProps = {
        className:
            "card header-card text-center m-2 text-primary " +
            (className ?? ""),
        ...props,
    }

    return (
        <div {...mergedProps}>
            {href !== undefined ? (
                <Link
                    className="text-decoration-none text-reset my-auto py-4 d-block"
                    to={href}
                >
                    {children}
                </Link>
            ) : (
                <div className="my-auto py-4 d-block">{children}</div>
            )}
        </div>
    )
}
