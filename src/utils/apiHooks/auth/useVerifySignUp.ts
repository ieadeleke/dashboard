import { useState } from "react"
import { useApi } from ".."
import { VerifySignUpParams } from "@/utils/services/auth/types"
import { AuthService } from "@/utils/services/auth"


export const useVerifySignUp = () => {
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const { isLoading, error, execute } = useApi()

    async function verifySignUp(params: VerifySignUpParams) {
        setIsComplete(false)
        const response = await execute(async () => await AuthService().verifySignUp(params))
        if (response) {
            setIsComplete(true)
        }
    }

    return { isLoading, error, verifySignUp, isComplete }
}