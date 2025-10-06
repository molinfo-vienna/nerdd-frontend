import classNames from "classnames"
import { Children, cloneElement, ReactElement, ReactNode } from "react"
import "./TabCard.css"

import CopyToClipboard from "./CopyToClipboard"

type TabCardProps = {
    tabs: [
        {
            name: string
            label: string
            icon: React.ReactNode
            content: string
        },
    ]
    activeTab: string
    onSelectTab: (tabName: string) => void
    children: ReactNode
}

export default function TabCard({
    activeTab,
    onSelectTab,
    children,
}: TabCardProps) {
    const childrenArray = Children.toArray(children)
    const tabs: ReactElement<TabCardTabProps>[] = childrenArray
        .filter((child: any) => child.type === TabCard.Tab)
        .map((child: any) =>
            cloneElement(child, {
                selectedLanguage: activeTab,
            }),
        )

    const selectedTab = tabs.find((tab) => tab.props.name === activeTab)
    const selectedContent = selectedTab ? selectedTab.props.contentToCopy : ""

    return (
        <div className="card rounded-4 hljs border-0 mb-5 bg-primary-subtle">
            <div className="card-header text-primary bg-primary-subtle border-0 pb-0 border-bottom">
                <ul className="nav nav-pills ms-2" role="tablist">
                    {tabs.map(({ props: { name, label, icon } }) => (
                        <li key={name} role="presentation">
                            <button
                                className={classNames(
                                    "btn btn-underline fs-7",
                                    {
                                        active: activeTab === name,
                                    },
                                )}
                                id={`${name}-button`}
                                type="button"
                                role="tab"
                                aria-controls={name}
                                aria-selected={activeTab === name}
                                onClick={() => onSelectTab(name)}
                            >
                                <span className="align-middle">{icon}</span>
                                <span className="ms-2 align-middle">
                                    {label}
                                </span>
                            </button>
                        </li>
                    ))}
                    {/* Add an item filling the remaining space to push the last tab to the right */}
                    <li className="flex-fill"></li>
                    {/* Copy to clipboard */}
                    <li className="nav-item">
                        <CopyToClipboard textToCopy={selectedContent} />
                    </li>
                </ul>
            </div>
            <div className="card-body tab-content">{tabs}</div>
        </div>
    )
}

type TabCardTabProps = {
    name: string
    label: string
    icon: ReactNode
    selectedLanguage?: string
    contentToCopy: string
    children: ReactNode
}

TabCard.Tab = function TabCardTab({
    name,
    label,
    icon,
    selectedLanguage,
    contentToCopy,
    children,
}: TabCardTabProps) {
    return (
        <div
            className={classNames("tab-pane px-3", {
                active: selectedLanguage === name,
            })}
            id={`${name}-tab`}
            role="tabpanel"
            aria-labelledby={`${name}-tab`}
            tabIndex={0}
        >
            {children}
        </div>
    )
}
