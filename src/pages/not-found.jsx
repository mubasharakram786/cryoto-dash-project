import { Link } from "react-router-dom"

const NotFoundPage = () =>{
    const styles ={
        container:{
            maxWidth:"800px",
            margin:"0 auto",
            textAlign:"center",
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        },
        title:{
            fontSize:'72px',
            color:'#fff',
            lineHeight:"84px"
        },
        message:{
            fontSize:'1.25rem',
            lineHeight:"22px",
            marginBottom:"40px"
        },
        link:{
            backgroundColor:'#fff',
            color:"#0e1117",
            borderRadius:"5px",
            padding:"8px 12px",
            display:"inline-block"
        }
    }
    return (
        <>
        <div style={styles.container}>
            <div>
        <h1 style={styles.title}>404 Not Found</h1>
        <p style={styles.message}>Sorry, the page you’re looking for doesn’t exist or may have been moved. </p>
        <Link style={styles.link} to={'/'}>Back to home</Link>

            </div>

        </div>
        </>
    )
}

export default NotFoundPage