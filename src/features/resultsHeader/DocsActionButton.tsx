import { FaBookOpen } from "react-icons/fa6"
import ActionButton from "./ActionButton"

type DocsActionButtonProps = {
    moduleId: string
}

export default function DocsActionButton({ moduleId }: DocsActionButtonProps) {
    return (
        <ActionButton to={`/${moduleId}/about`} label="Docs">
            <ActionButton.Icon>
                <FaBookOpen
                    viewBox="0 32 576 440"
                    style={{ width: "1.4em", height: "1em" }}
                />
            </ActionButton.Icon>
        </ActionButton>
    )
}
