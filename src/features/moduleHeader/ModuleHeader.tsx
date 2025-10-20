import { useModules } from "@/services"
import { type Module } from "@/types"
import classNames from "classnames"
import { useState } from "react"
import { FaBook, FaBookOpen, FaPlug } from "react-icons/fa6"
import Markdown from "react-markdown"
import { Link, useMatches } from "react-router-dom"
import PublicationDialog from "../publicationDialog/PublicationDialog"
import HeaderLink from "./HeaderLink"
import ModuleSelectionCard from "./ModuleSelectionCard"

type ModuleHeaderProps = {
    module?: Module
    title: string
    description: string
    subRoute: string
}

export default function ModuleHeader({
    module,
    title,
    description,
    subRoute,
}: ModuleHeaderProps) {
    // get current route id (for link highlighting)
    const matches = useMatches()
    const routeId = matches.at(-1)?.id

    const { modules, isLoading: isLoadingAllModules } = useModules()

    const pseudoModule = {
        id: undefined,
        visibleName: "Overview",
        description: description,
    }

    const activeModule = module == null ? pseudoModule : module

    //
    // citation modal
    //
    const [citeDialogOpen, setCiteDialogOpen] = useState(false)

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
                        <span className="text-primary fw-bold">{title}: </span>
                        {activeModule.visibleName}
                    </h2>
                    <Markdown className="lead">
                        {activeModule.description}
                    </Markdown>
                    {activeModule?.id && (
                        <div>
                            <HeaderLink
                                Icon={FaBookOpen}
                                href={`/${activeModule.id}/about`}
                                caption="Docs"
                                active={routeId === "about"}
                            />
                            <HeaderLink
                                Icon={FaPlug}
                                href={`/${activeModule.id}/api`}
                                caption="API"
                                active={routeId === "apiDocs"}
                            />
                            <HeaderLink
                                Icon={FaBook}
                                onClick={() => setCiteDialogOpen(true)}
                                caption="Cite"
                            />
                            <PublicationDialog
                                isOpen={citeDialogOpen}
                                setIsOpen={setCiteDialogOpen}
                                publications={module?.publications}
                            />
                        </div>
                    )}
                    <div
                        // d-block d-lg-none: show the list of links only on small screens
                        className="d-block d-lg-none"
                    >
                        {!isLoadingAllModules &&
                            modules.map((module, index) => (
                                <Link
                                    key={index}
                                    className={classNames(
                                        "text-decoration-none my-auto me-4",
                                        {
                                            "fw-bold":
                                                module.id === activeModule.id,
                                        },
                                    )}
                                    to={`/${module.id}/api`}
                                >
                                    <span>{module.visibleName}</span>
                                </Link>
                            ))}
                    </div>
                </div>
                {/* Info card as column on large screens */}
                <ModuleSelectionCard
                    modules={modules}
                    isLoadingAllModules={isLoadingAllModules}
                    activeModuleId={activeModule.id}
                    subRoute={subRoute}
                />
            </div>
        </section>
    )
}
