import {useState,useEffect} from 'react'
import CoinCard from './components/CoinCard'
import LimitSelect from './components/LimitSelect'
import FilterInput from './components/FilterInput'

const App = () => {
  const [coins,setCoins] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const[limit,setLimit] = useState(10)
  const [filter,setFilter] = useState('')
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
    const filteredCoins = coins.filter((coin)=>{
      return coin.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLocaleLowerCase())
    })
  return(
    <>
    <h1>🚀 Crypto Dash</h1>
  {loading && <p>Loading</p>}
  {error && <div className='error'>{error}</div>}
  <div className="top-controls">
       <FilterInput filter={filter} onFilterChange={setFilter} /> 
      <LimitSelect limit={limit} onLimitChange={setLimit} />
  </div>
    {!loading && !error && (
      <main className='grid'>
          {filteredCoins.length > 0 ? filteredCoins.map((coin)=>(
            <CoinCard coin={coin} key={coin.id}/>
          )): <p>No matching coins</p>}
      </main>
    )}
    </>

  )
}

export default App