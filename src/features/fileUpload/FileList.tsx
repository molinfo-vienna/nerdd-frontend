import FileItem from "./FileItem"
import { File } from "./fileFieldSlice"

type FileListProps = {
    files?: File[]
    onClickDelete?: (file: File) => void
}

export default function FileList({ files, onClickDelete }: FileListProps) {
    return (
        <ul className="px-3 py-2 list-unstyled w-100">
            {files !== undefined &&
                files.map((file) => (
                    <FileItem
                        key={file.id}
                        file={file}
                        onClickDelete={() =>
                            onClickDelete && onClickDelete(file)
                        }
                    />
                ))}
        </ul>
    )
}
