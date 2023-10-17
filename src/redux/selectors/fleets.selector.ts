import useSelector from "../utils/useSelector";

export function useFleetsSelector() {
    return useSelector((state) => state.fleets)
}