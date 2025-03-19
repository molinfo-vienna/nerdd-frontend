import { type Module } from "@/types"
import { type ComponentType } from "react"
import { FaBook, FaBookOpen, FaPlug } from "react-icons/fa6"
import Markdown from "react-markdown"
import { Link } from "react-router-dom"

type ModuleHeaderProps = {
    module: Module;
}

type IconItem = {
    Icon: ComponentType<{ size?: number }>;
    caption: string;
    href?: string;
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

    return (
        <section className="container py-5">
            <div className="row justify-content-center pb-3">
                <div className="col-sm-6">
                    <h2 className="pb-3">
                        <span className="text-primary fw-bold">
                            {module.visibleName}
                            {module.title ? ": " : ""}
                        </span>
                        {module.title}
                    </h2>
                    <Markdown className="lead">{module.description}</Markdown>
                </div>
                <div className="col-sm-4 align-content-center justify-content-center px-4">
                    <div className="card">
                        {/* {title !== undefined && (
                                <div className="card-header">
                                    <h4 className="my-0 text-body-secondary">
                                        {title}
                                    </h4>
                                </div>
                            )} */}

                        {module.publications?.map((publication, i) => (
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
                                        className={`flex-fill ${index == icons.length - 1 ? "" : "border-right"}`}
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
