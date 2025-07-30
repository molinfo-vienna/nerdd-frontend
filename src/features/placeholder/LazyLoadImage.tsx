import classNames from "classnames"
import { useState } from "react"
import ImagePlaceholder from "./ImagePlaceholder"

type LazyLoadImageProps = {
    src: string
    alt: string
    className?: string
}

export default function LazyLoadImage({
    src,
    alt,
    className,
}: LazyLoadImageProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading && <ImagePlaceholder className={className} />}
            {/* we can not use {!isLoading && ...} here, because we need to add the image tag to
                the DOM in order to initiate the loading of the image */}
            <img
                className={classNames(className, {
                    "d-none": isLoading,
                })}
                src={src}
                alt={alt}
                onLoad={() => setIsLoading(false)}
            />
        </>
    )
}
