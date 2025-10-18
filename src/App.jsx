import {useState,useEffect} from 'react'
import CoinCard from './components/CoinCard'
import LimitSelect from './components/LimitSelect'

const App = () => {
  const [coins,setCoins] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const[limit,setLimit] = useState(10)
  useEffect(()=>{
    const fetchCoins = async() =>{
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if(!res.ok){
          return new Error('Failed to fetch records')
        }
        let coins = await res.json()
        setCoins(coins);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error.message)
      }
    }
    fetchCoins()
  },[limit])

  return(
    <>
    <h1>🚀 Crypto Dash</h1>
  {loading && <p>Loading</p>}
  {error && <div className='error'>{error}</div>}
      <LimitSelect limit={limit} onLimitChange={setLimit} />
    {!loading && !error && (
      <main className='grid'>
          {coins.map((coin)=>(
            <CoinCard coin={coin} key={coin.id}/>
          ))}
      </main>
    )}
    </>

  )
}

export default App