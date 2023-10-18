import { removeModelDuplicates } from "@/utils/helpers/removeDuplicates"
import { RequestConfig } from "../../request"
import { FleetService } from "../fleets"


export function OperatorsService(config?: RequestConfig) {

    async function getOperators() {
        const data = await FleetService().getAllFleets()
        const users = removeModelDuplicates(data.Boats.map((boat) => boat.User), "_id")
        return users
    }

    return {
        getOperators
    }

}