import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

const CoinDetailPage = () =>{
    const [coin , setCoin] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
        const fetchCoinDetails=async()=>{
            try {
                const response = await fetch(`${import.meta.env.VITE_COIN_API_URL}/${id}`);
                if(!response.ok){
                    throw Error("Failed to fetch coin details")
                }
                const coinDetails = await response.json();
                console.log(coinDetails);
                setLoading(false);
                setCoin(coinDetails)
                
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
        fetchCoinDetails()
    },[])
    return(
        <div>Detail Page: {JSON.stringify(coin)} </div>
    )
}

export default CoinDetailPage