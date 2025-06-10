import "altcha"

type AltchaWidgetProps = {
    challengeUrl: string
    floating: boolean
}

export default function AltchaWidget({
    challengeUrl,
    floating = true,
}: AltchaWidgetProps) {
    return (
        <altcha-widget
            challengeurl={challengeUrl}
            floating={floating}
        ></altcha-widget>
    )
}
