import { Children } from "react"

type TileProps = {
    children: React.ReactNode
}

export default function Tile({ children }: TileProps) {
    const childrenArray = Children.toArray(children)

    const icon = childrenArray.find((child: any) => child.type === Tile.Icon)
    const highlight = childrenArray.find(
        (child: any) => child.type === Tile.Highlight,
    )
    const label = childrenArray.find((child: any) => child.type === Tile.Label)

    return (
        <li className="list-group-item">
            <div className="d-flex align-items-center my-3">
                <div
                    className="text-center ms-2 me-2"
                    style={{ width: "70px" }}
                >
                    <span className="text-primary">{icon}</span>
                </div>
                <div>
                    <p className="text-primary lead m-0">{highlight}</p>
                    <p className="m-0 p-0 text-body-secondary">{label}</p>
                </div>
            </div>
        </li>
    )
}

Tile.Icon = function TileIcon({ children }) {
    return <>{children}</>
}

Tile.Highlight = function TileHighlight({ children }) {
    return <>{children}</>
}

Tile.Label = function TileLabel({ children }) {
    return <>{children}</>
}
