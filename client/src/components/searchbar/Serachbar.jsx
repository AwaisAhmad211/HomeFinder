import React, { useState } from 'react'
import './searchbar.scss'
import searchIcon from '../../assets/search.png'

const Serachbar = () => {
  const types = ["buy" , "rent"];
  const [query,setQuery] = useState({
    type : "buy",
    city : "",
    minPrice: 0,
    maxPrice: 0
  })
  const switchType = (val) => {
    setQuery((pre) => ({...pre,type:val}))
  }
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className='searchbar'>
      <div className="type">
        {
          types.map((type) => (
            <button onClick={() => switchType(type)}
             key={type} className={query.type === type ? "active" : ""}>{type}</button>
          ))
        }
      </div>
      <form action="">
        <input
        onClick={handleChange}
        type="text" name='location' placeholder='City Location'/>
        <input
        onClick={handleChange}
        type="number" name='minPrice' placeholder='Min Price' />
        <input
        onClick={handleChange}
        type="number" name='maxPrice'  placeholder='Max Price'/>
        <a href=""><button><img src={searchIcon} alt="SearchIcon" /></button></a>
      </form>
    </div>
  )
}

export default Serachbar
