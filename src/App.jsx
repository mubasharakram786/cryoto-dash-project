import {useState,useEffect} from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Header from './components/Header'
import NotFoundPage from './pages/not-found'
import CoinDetailPage from './pages/coin-detail'
const App = () => {
  const [coins,setCoins] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const[limit,setLimit] = useState(10)
  const [filter,setFilter] = useState('')
  const [sortBy,setSortBy] = useState('market_cap_desc')
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
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage
        loading={loading}
        error={error}
        coins={coins}
        limit={limit}
        setLimit={setLimit}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        />}/>
        <Route path='/about' element={<About/>} />
        <Route path='/coin/:id' element={<CoinDetailPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>

  )
}

export default App