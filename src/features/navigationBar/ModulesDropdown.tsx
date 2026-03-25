import { useGetModulesQuery } from "@/services/modules"
import classNames from "classnames"
import { Link } from "react-router-dom"

export default function ModulesDropdown() {
    const { data: modules, error } = useGetModulesQuery()

    return (
        <li className="nav-item dropdown">
            <a
                className={classNames("nav-link dropdown-toggle", {
                    disabled: error != null,
                })}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-disabled={error != null}
            >
                Modules
            </a>
            {modules != null && error == null && (
                <ul className="dropdown-menu">
                    {modules.map((module) => (
                        <li key={module.id}>
                            <Link
                                to={`/${module.id}`}
                                className="dropdown-item"
                            >
                                {module.visibleName}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}
