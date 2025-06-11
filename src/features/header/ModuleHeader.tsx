import { type Module } from "@/types"
import classNames from "classnames"
import { type ComponentType } from "react"
import { FaBook, FaBookOpen, FaPlug } from "react-icons/fa6"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"

type ModuleHeaderProps = {
    module: Module
}

type IconItem = {
    Icon: ComponentType<{ size?: number }>
    caption: string
    href?: string
}

export default function ModuleHeader({ module }: ModuleHeaderProps) {
    const icons: IconItem[] = [
        {
            Icon: FaBookOpen,
            caption: "Docs",
            href: `/${module.id}/about`,
        },
        {
            Icon: FaPlug,
            caption: "API",
            href: `/${module.id}/api`,
        },
        {
            Icon: FaBook,
            caption: "Cite",
            href: `/${module.id}/cite`,
        },
    ]

    // Notes about the responsive design:
    // * Header:
    //   * consists of two parts: (1) title & description and (2) info card
    //
    // * Info card:
    //   * Small screens (Smartphone): list of links below title and description
    //   * Medium screens (Tablet sideways): column on the right side
    //   * Large screens (Desktop): same as medium screens

    return (
        <section className="container py-5">
            <div className="row justify-content-center pb-3">
                <div className="col col-lg-8 col-xl-6">
                    <h2 className="pb-3">
                        <span className="text-primary fw-bold">
                            {module.visibleName}
                            {module.title ? ": " : ""}
                        </span>
                        {module.title}
                    </h2>
                    <Markdown className="lead">{module.description}</Markdown>
                    {/* Info card as list of links */}
                    <div
                        // d-block d-lg-none: show the list of links only on small screens
                        className="d-block d-lg-none"
                    >
                        {icons.map((icon, index) =>
                            icon.href !== undefined ? (
                                <Link
                                    className="text-decoration-none my-auto me-4"
                                    to={icon.href}
                                >
                                    <icon.Icon size={15} />
                                    <span className="ms-1">{icon.caption}</span>
                                </Link>
                            ) : (
                                <div className="my-auto d-block">
                                    {icon.caption}
                                </div>
                            ),
                        )}
                    </div>
                </div>
                {/* Info card as column on large screens */}
                <div
                    // d-none d-lg-block: show this column only on large screens
                    // ps-xl-5: add padding on the left side for very large screens
                    className="col-4 d-none d-lg-block ps-xl-5"
                >
                    <div className="card">
                        {module.publications.map((publication, i) => (
                            <div
                                className="card-body d-flex flex-wrap px-4"
                                key={i}
                            >
                                <p className="fw-bold mb-2">
                                    {publication.title}{" "}
                                    <span className="fw-normal text-body-secondary">
                                        ({publication.journal}{" "}
                                        {publication.year})
                                    </span>
                                </p>
                                <p className="mb-2">
                                    {publication.authors
                                        ?.map(
                                            (author: any) =>
                                                `${author.firstName} ${author.lastName}`,
                                        )
                                        .join(", ")}
                                </p>
                            </div>
                        ))}

                        <div className="card-footer px-0">
                            <div className="d-flex flex-wrap">
                                {icons.map((icon, index) => (
                                    <div
                                        className={classNames("flex-fill", {
                                            "border-right":
                                                index !== icons.length - 1,
                                        })}
                                        key={index}
                                    >
                                        <div className="text-center my-2 text-primary">
                                            {icon.href !== undefined ? (
                                                <Link
                                                    className="text-decoration-none text-reset my-auto d-block"
                                                    to={icon.href}
                                                >
                                                    <p className="mb-1">
                                                        <icon.Icon size={35} />
                                                    </p>
                                                    <span>{icon.caption}</span>
                                                </Link>
                                            ) : (
                                                <div className="my-auto d-block">
                                                    {icon.caption}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
