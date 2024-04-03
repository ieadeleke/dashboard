import moment from "moment";

export function formatDate(date: string){
    return moment(date).format("MMMM D, YYYY h:mm A")
}