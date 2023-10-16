import CircularProgress from "@mui/material/CircularProgress";

export default function Loading(){
    return <div className="w-full h-full flex justify-center items-center">
        <CircularProgress />
    </div>
}