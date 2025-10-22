import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
const CoinDetailPage = () =>{
    const [coin , setCoin] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const {id} = useParams()
    // useEffect(()=>{
    //     const fetchCoinDetails=async()=>{
    //         const response = await fetch()
    //     }
    // },[])
    return(
        <div>Detail Page: {id} </div>
    )
}

export default CoinDetailPage