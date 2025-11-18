import { FaRegClipboard } from "react-icons/fa6"
import "./CopyToClibboard.css"

type CopyToClipboardProps = {
    textToCopy?: string
}

export default function CopyToClipboard({ textToCopy }: CopyToClipboardProps) {
    const handleClick = () => {
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
        }
    }

    return (
        <button
            className="btn btn-transparent text-decoration-none"
            onClick={handleClick}
        >
            <FaRegClipboard size={18} />
        </button>
    )
}
