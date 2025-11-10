import { useDispatch, useSelector, useStore } from "react-redux"
import {
    AppDispatch,
    AppStore,
    DevelopmentAppDispatch,
    DevelopmentAppStore,
    DevelopmentRootState,
    RootState,
} from "./store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const useDevelopmentAppDispatch =
    useDispatch.withTypes<DevelopmentAppDispatch>()
export const useDevelopmentAppSelector =
    useSelector.withTypes<DevelopmentRootState>()
export const useDevelopmentAppStore = useStore.withTypes<DevelopmentAppStore>()
