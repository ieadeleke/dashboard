import { useState } from "react"
import { useApi } from ".."
import { SignUpParams } from "@/utils/services/auth/types"
import { AuthService } from "@/utils/services/auth"


export const useSignUp = () => {
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const { isLoading, error, execute } = useApi()

    async function signUp(params: SignUpParams) {
        setIsComplete(false)
        const response = await execute(async () => await AuthService().signUp(params))
        if (response) {
            setIsComplete(true)
        }
    }

    return { isLoading, error, signUp, isComplete }
}