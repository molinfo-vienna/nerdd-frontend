import { createContext, type RefCallback, useContext } from "react"

export type TooltipPositionReference = RefCallback<HTMLElement>

const TooltipPositionReferenceContext = createContext<
    TooltipPositionReference | undefined
>(undefined)

export const TooltipPositionProvider = TooltipPositionReferenceContext.Provider

export function useTooltipPositionReference() {
    return useContext(TooltipPositionReferenceContext)
}
