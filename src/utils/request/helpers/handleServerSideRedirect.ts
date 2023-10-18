import { errorHandler } from "@/utils/errorHandler"

export function handleServerSideRedirect(error: any, callback?: () => any) {
    const errorData = errorHandler(error)
    if (errorData.status == 401 || errorData.message == 'Not authenticated') {
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