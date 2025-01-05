import React from "react"
import Markdown from "react-markdown"
import { moduleType } from "../../types"
import HeaderOneCard from "./HeaderOneCard"

export default function ModuleHeader({ module }) {
    return (
        <HeaderOneCard module={module}>
            <HeaderOneCard.Content>
                <Markdown className="lead">{module.description}</Markdown>
            </HeaderOneCard.Content>
            {module.publications.map((publication, i) => (
                <HeaderOneCard.CardSection key={i}>
                    <p className="fw-bold mb-2">
                        {publication.title}{" "}
                        <span className="fw-normal text-body-secondary">
                            ({publication.journal} {publication.year})
                        </span>
                    </p>
                    <p className="mb-2">
                        {publication.authors
                            .map(
                                (author) =>
                                    `${author.firstName} ${author.lastName}`,
                            )
                            .join(", ")}
                    </p>
                </HeaderOneCard.CardSection>
            ))}
            <HeaderOneCard.Icon
                icon="FaBookOpen"
                caption="Docs"
                href={`/${module.id}/about`}
            />
            <HeaderOneCard.Icon
                icon="FaPlug"
                caption="API"
                href={`/${module.id}/api`}
            />
            <HeaderOneCard.Icon
                icon="FaBook"
                caption="Cite"
                href={`/${module.id}/cite`}
            />
            {/* <Header.Card>
        <p className="mb-2">
            <Icon name="FaClock" size={35} className="me-2" />
        </p>
        <span className="fs-6">
            <TangleRuntime
                moleculesPerSecond={2}
                initialValue={100}
            />
        </span>
    </Header.Card> */}
        </HeaderOneCard>
    )
}

ModuleHeader.propTypes = {
    module: moduleType.isRequired,
}
