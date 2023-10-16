import { errorHandler } from "@/utils/errorHandler"

export function handleServerSideRedirect(error: any, callback?: () => any) {
    if (errorHandler(error).status == 401) {
        return {
            props: {},
            redirect: {
                destination: '/login'
            }
        }
    } else {
        return callback?.()
    }
}