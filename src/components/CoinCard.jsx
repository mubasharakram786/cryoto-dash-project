import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard = ({coin}) => {
  return (
    <Link to={`/coin/${coin.id}`}>
    <div className="coin-card">
              <div className="coin-header">
                <img src={coin.image} alt={coin.name} className='coin-image' />
                <div>
                  <h2>{coin.name}</h2>
                  <p className='symbol'>{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
                <p>Price: {coin.current_price.toLocaleString('en-US',{style:'currency', currency:'USD'})}</p>
                <p className={coin.price_change_percentage_24h >=0 ? 'positive' : 'negative'}>{Number(coin.price_change_percentage_24h)?.toFixed(2)}%</p>
                <p>Market cap: {coin.market_cap.toLocaleString()}</p>
            </div>
    
    </Link>
  )
}

export default CoinCard