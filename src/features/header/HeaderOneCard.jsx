import propTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { moduleType } from "../../types"
import Icon from "../icon/Icon"
import NavigationBar from "../navigationBar/NavigationBar"
import "./style.scss"

export default function HeaderOneCard({ module, children, title }) {
    // get child having the pseudo type "Content"
    const content = React.Children.toArray(children).find(
        (child) => child.type?.name === "HeaderContent",
    )

    const icons = React.Children.toArray(children).filter(
        (child) => child.type?.name === "HeaderIcon",
    )

    const cardSections = React.Children.toArray(children).filter(
        (child) => child.type?.name === "HeaderCardSection",
    )

    return (
        <header className="bg-body-tertiary">
            <NavigationBar />
            <section className="container py-5">
                <div className="row justify-content-center pb-3">
                    <div className="col-sm-6">
                        <h1 className="pb-3">
                            <span className="text-primary fw-bold">
                                {module.visibleName}
                                {module.title ? ": " : ""}
                            </span>
                            {module.title}
                        </h1>
                        {content}
                    </div>
                    <div className="col-sm-4 align-content-center justify-content-center px-4">
                        <div className="card">
                            {title !== undefined && (
                                <div className="card-header">
                                    <h4 className="my-0 text-body-secondary">
                                        {title}
                                    </h4>
                                </div>
                            )}

                            {cardSections.map((section, index) => (
                                <div
                                    className="card-body d-flex flex-wrap px-4"
                                    key={index}
                                >
                                    {section}
                                </div>
                            ))}

                            <div className="card-footer px-0">
                                <div className="d-flex flex-wrap">
                                    {icons.map((icon, index) => (
                                        <div
                                            className={`flex-fill ${index == icons.length - 1 ? "" : "border-right"}`}
                                            key={index}
                                        >
                                            {icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}

HeaderOneCard.Content = function HeaderContent({ children }) {
    return <>{children}</>
}

HeaderOneCard.CardSection = function HeaderCardSection({ children }) {
    return <>{children}</>
}

HeaderOneCard.Icon = function HeaderIcon({
    href,
    icon,
    caption,
    className,
    ...props
}) {
    // merge props with default values
    const mergedProps = {
        className: "text-center my-2 text-primary " + (className ?? ""),
        ...props,
    }

    return (
        <div {...mergedProps}>
            {href !== undefined ? (
                <Link
                    className="text-decoration-none text-reset my-auto d-block"
                    to={href}
                >
                    <p className="mb-1">
                        <Icon name={icon} size={35} />
                    </p>
                    <span>{caption}</span>
                </Link>
            ) : (
                <div className="my-auto d-block">{caption}</div>
            )}
        </div>
    )
}

HeaderOneCard.propTypes = {
    module: moduleType,
    children: propTypes.node,
    title: propTypes.string,
}

HeaderOneCard.Content.propTypes = {
    children: propTypes.node,
}

HeaderOneCard.CardSection.propTypes = {
    children: propTypes.node,
}

HeaderOneCard.Icon.propTypes = {
    href: propTypes.string,
    icon: propTypes.string.isRequired,
    caption: propTypes.string.isRequired,
    className: propTypes.string,
}
