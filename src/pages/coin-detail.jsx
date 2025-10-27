import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Loader from "../components/Loader"
import CoinChart from "../components/CoinChart"
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
        <div className="coin-details-container">
            <Link to={'/'}> Back to home</Link>
            <h1 className="coin-details-title">
                {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details' }
            </h1>
            {loading && <Loader/>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
                <>
                    <img src={coin.image.large} alt={coin.name} className="coin-details-image" />
                    <p>{coin.description.en.split('. ')[0] + '.'}</p>
                    <div className="coin-details-info">
                        <h3>Rank: {coin.market_cap_rank}</h3>
                        <h3>Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
                        <h4>Market Cap: {coin.market_data.market_cap.usd.toLocaleString()}</h4>
                        <h4>24th High: {coin.market_data.high_24h.usd.toLocaleString()}</h4>
                        <h4>24th Low: {coin.market_data.low_24h.usd.toLocaleString()}</h4>
                        <h4>24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}
                            ({coin.market_data.price_change_percentage_24h.toFixed(20)}%)
                        </h4>
                        <h4>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}</h4>
                        <h4>Total Supply: {coin.market_data.total_supply?.toLocaleString() || 'N/A'}</h4>
                        <h4>
                            All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
                            {new Date(coin.market_data.ath_date.usd).toLocaleString()}
                        </h4>
                        <h4>
                            All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{' '}
                            {new Date(coin.market_data.atl_date.usd).toLocaleString()}
                        </h4>
                        <h4>Last Updated: {new Date(coin.last_updated).toLocaleString()}</h4>
                    </div>

                    <CoinChart coinId={coin.id}/>
                    <div className="coin-details-links">
                        {coin.links.homepage[0] && (
                            <p>
                                🌍{' '}
                                <a href={coin.links.homepage[0]}
                                target="_blank"
                                rel="noopener noreferrer">
                                    Website
                                </a>
                            </p>
                        )}
                        {coin.links.blockchain_site[0] && (
                            <p>
                                🔩{' '}
                                <a href={coin.links.blockchain_site[0]}
                                target="_blank"
                                rel="noopener noreferrer">
                                    Blockchain Explorer
                                </a>
                            </p>
                        )}
                        {coin.categories.length >  0 && (
                            <p>Categories: {coin.categories.join(', ')}</p>
                        )}
                        {!loading && !error && !coin && <p>No Data Found!</p>}
                    </div>
                </>
            )}
             </div>
    )
}

export default CoinDetailPage