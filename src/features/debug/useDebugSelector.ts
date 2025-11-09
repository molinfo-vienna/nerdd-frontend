import { useSelector } from "react-redux"
import type { DebugRootState } from "./debugSlice"

export const useDebugSelector = useSelector.withTypes<DebugRootState>()
