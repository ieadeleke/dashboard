
export function errorHandler(error: any) {
    const { response } = error
    if (response && response.data) {
        const { data, status } = response
        if (data.message) {
            return {
                status: status as number,
                message: data.message as string
            }
        } else {
            return {
                status: status,
                message: "An unexpected error has occurred"
            }
        }
    } else {
        console.log("asd")
        return {
            status: 500,
            message: error.message || "An unexpected error has occurred"
        }
    }

}