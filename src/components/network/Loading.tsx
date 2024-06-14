import CircularProgress from "@mui/material/CircularProgress";
import styles from './styles/loading.module.css'

export default function Loading(){
    return <div className={styles.container}>
        <CircularProgress />
    </div>
}